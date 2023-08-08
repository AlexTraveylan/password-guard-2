import { verifyAccessToken } from "@/services/auth.service"
import { generateRSAKeyPair } from "@/services/security.service"
import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import { UserApp } from "@prisma/client"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: "Impossible de trouver l&aposaposuser." }, { status: 400 })
  }

  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")
  if (!accessToken) {
    return NextResponse.json({ error: "Pas de token d&aposacces dans les cookies." }, { status: 400 })
  }
  try {
    const decoded = verifyAccessToken(accessToken.value)
  } catch (err) {
    return NextResponse.json({ error: "Le token n&aposest pas valide ou à expiré." }, { status: 400 })
  }

  return NextResponse.json({ message: "Acces autorisé" }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const randomSalt = await bcrypt.genSalt(16)
  const { hashMaster } = await request.json()
  const user = await currentUser()

  // Verifie que l&aposuser est bien connecté avec clerk
  if (!user?.primaryEmailAddressId || !user.firstName || !user.lastName) {
    return NextResponse.json({ error: "Impossible de trouver l&aposuser." }, { status: 400 })
  }
  const name = `${user.firstName} ${user.lastName}`

  // recherche de l&aposemail principale s&aposil existe.
  const primaryEmail = user.emailAddresses.find((email) => email.id == user.primaryEmailAddressId)
  if (!primaryEmail) {
    return NextResponse.json({ error: "Impossible de trouver l&apose-mail." }, { status: 400 })
  }

  // Est-ce un nouvel user comme prévu ?
  const searchCurrentUser = await userAppService.getByEmail(primaryEmail.emailAddress)
  if (searchCurrentUser) {
    return NextResponse.json({ error: "Impossible de trouver l&apose-mail." }, { status: 400 })
  }

  try {
    const doubleHashedMaster = await bcrypt.hash(hashMaster, randomSalt)
    const { privateKey, publicKey } = generateRSAKeyPair()

    const newUser: Omit<UserApp, "id"> = {
      email: primaryEmail.emailAddress,
      name: name,
      masterPassword: Buffer.from(doubleHashedMaster, "utf-8"),
      salt: randomSalt,
      privateKey: Buffer.from(privateKey.toString(), "utf-8"),
      publicKey: Buffer.from(publicKey.toString(), "utf-8"),
    }

    const createdUser = await userAppService.create(newUser)
    return NextResponse.json({ message: "Utilisateur enregistré" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Echec de la création" }, { status: 400 })
  }
}
