import { guardedPasswordService } from "@/services/GuardedPassword.service"
import { verifyAccessToken } from "@/services/auth.service"
import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

// Récupérer tous les mots de passe
export async function GET(request: NextRequest) {
  const user = await currentUser()
  if (!user?.primaryEmailAddressId) {
    return NextResponse.json({ error: "Impossible de trouver l'e-mail." }, { status: 400 })
  }

  const primaryEmail = user.emailAddresses.find((email) => email.id == user.primaryEmailAddressId)
  if (!primaryEmail) {
    return NextResponse.json({ error: "Impossible de trouver l'e-mail." }, { status: 400 })
  }

  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")
  if (!accessToken) {
    return NextResponse.json({ error: "Pas de token d'acces dans les cookies." }, { status: 400 })
  }
  try {
    const decoded = verifyAccessToken(accessToken.value)
  } catch (err) {
    return NextResponse.json({ error: "Le token n'est pas valide ou à expiré." }, { status: 400 })
  }

  const cUser = await userAppService.getByEmail(primaryEmail.emailAddress)
  if (!cUser) {
    return NextResponse.json({ error: "Impossible de trouver l'user." }, { status: 400 })
  }

  const passwords = await guardedPasswordService.getAllGuardedPasswordByUserID(cUser.id)
  if (!passwords) {
    return NextResponse.json({ error: "Echec dans la récupération des mots de passe." }, { status: 400 })
  }

  return NextResponse.json({ message: "Acces autorisé", passwords: passwords }, { status: 200 })
}

// Création d'un mot de passe
export async function POST(request: NextRequest) {
  const user = await currentUser()
  let cUser
  if (user) {
    if (!user?.primaryEmailAddressId) {
      return NextResponse.json({ error: "Impossible de trouver l'e-mail." }, { status: 400 })
    }

    const primaryEmail = user.emailAddresses.find((email) => email.id == user.primaryEmailAddressId)
    if (!primaryEmail) {
      return NextResponse.json({ error: "Impossible de trouver l'apose-mail." }, { status: 400 })
    }

    const cookieStore = cookies()
    const accessToken = cookieStore.get("accessToken")
    if (!accessToken) {
      return NextResponse.json({ error: "Pas de token d'acces dans les cookies." }, { status: 400 })
    }
    try {
      const decoded = verifyAccessToken(accessToken.value)
    } catch (err) {
      return NextResponse.json({ error: "Le token n'est pas valide ou à expiré." }, { status: 400 })
    }

    cUser = await userAppService.getByEmail(primaryEmail.emailAddress)
  } else {
    cUser = await userAppService.getByEmail("noemail@sandbox.com")
  }

  if (!cUser) {
    return NextResponse.json({ error: "Impossible de trouver l'user." }, { status: 400 })
  }

  const {
    titre,
    login,
    encryptedPasswordDataJSON,
    encryptedAESKey,
  }: { titre: string; login: string; encryptedPasswordDataJSON: string; encryptedAESKey: string } = await request.json()
  const encryptedPasswordData: { iv: string; encryptedPassword: string } = JSON.parse(encryptedPasswordDataJSON)

  if (!cUser || !titre || !login || !encryptedPasswordData || !encryptedAESKey) {
    return NextResponse.json({ error: "Données manquantes pour la création." }, { status: 400 })
  }

  const newPassword = await guardedPasswordService.createGuardPassword({
    title: titre,
    login: login,
    iv: encryptedPasswordData.iv,
    password: Buffer.from(encryptedPasswordData.encryptedPassword, "hex"),
    encryptedAESKey: Buffer.from(encryptedAESKey, "base64"),
    userId: cUser.id,
  })

  if (!newPassword) {
    return NextResponse.json({ error: "Echec dans la création du mot de passe." }, { status: 400 })
  }

  return NextResponse.json({ message: "Password ajouté avec succes" }, { status: 201 })
}
