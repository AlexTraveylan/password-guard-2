import { generateRSAKeyPair } from "@/lib/services/security.service"
import { userAppService } from "@/lib/services/userApp.service"
import { UserApp } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const randomSalt = await bcrypt.genSalt(16)
  const { hashMaster, email } = await request.json()

  // Est-ce un nouvel user comme prévu ?
  const searchCurrentUser = await userAppService.getByEmail(email)
  if (searchCurrentUser) {
    return NextResponse.json({ error: "Utilisateur déjà existant" }, { status: 400 })
  }

  try {
    const doubleHashedMaster = await bcrypt.hash(hashMaster, randomSalt)
    const { privateKey, publicKey } = generateRSAKeyPair()

    const newUser: Omit<UserApp, "id"> = {
      email: email,
      name: email.split("@")[0],
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
