import { currentUser } from "@/lib/hooks/auth"
import { guardedPasswordService } from "@/lib/services/GuardedPassword.service"
import { userAppService } from "@/lib/services/userApp.service"
import { NextRequest, NextResponse } from "next/server"

// Création d'un mot de passe
export async function POST(request: NextRequest) {
  const { email, privateKey } = currentUser()

  if (!email || !privateKey) {
    return NextResponse.json({ error: "Vous devez être connecté pour créer un mot de passe." }, { status: 401 })
  }

  const cUser = await userAppService.getByEmail(email)
  if (!cUser) {
    return NextResponse.json({ error: "Impossible de trouver l'utilisateur." }, { status: 400 })
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
