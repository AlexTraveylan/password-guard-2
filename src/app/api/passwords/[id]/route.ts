import { currentUser } from "@/lib/hooks/auth"
import { guardedPasswordService } from "@/lib/services/GuardedPassword.service"
import { userAppService } from "@/lib/services/userApp.service"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { email } = currentUser()

  let cUser = null

  if (!email) {
    cUser = await userAppService.getByEmail("noemail@sandbox.com")
  } else {
    cUser = await userAppService.getByEmail(email)
  }

  if (!cUser) {
    return NextResponse.json({ error: "Impossible de trouver l'utilisateur." }, { status: 400 })
  }

  if (!params.id) {
    return NextResponse.json({ error: "Impossible de trouver l'id du mot de passe à supprimer." }, { status: 400 })
  }

  const passwordId = parseInt(params.id)

  try {
    await guardedPasswordService.deleteGuardedPasswordById(passwordId)
    return NextResponse.json({ message: "Suppression réussie" }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Echec de la suppression." }, { status: 400 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { email } = await currentUser()
  let cUser = null

  if (!email) {
    cUser = await userAppService.getByEmail("noemail@sandbox.com")
  } else {
    cUser = await userAppService.getByEmail(email)
  }

  if (!cUser) {
    return NextResponse.json({ error: "Impossible de trouver l'utilisateur." }, { status: 400 })
  }

  if (!params.id) {
    return NextResponse.json({ error: "Impossible de trouver l'id du mot de passe à supprimer." }, { status: 400 })
  }

  const passwordId = parseInt(params.id)

  const {
    titre,
    login,
    encryptedPasswordDataJSON,
    encryptedAESKey,
  }: { titre: string; login: string; encryptedPasswordDataJSON: string; encryptedAESKey: string } = await request.json()
  const encryptedPasswordData: { iv: string; encryptedPassword: string } = JSON.parse(encryptedPasswordDataJSON)

  if (!cUser || !titre || !login || !encryptedPasswordData || !encryptedAESKey) {
    return NextResponse.json({ error: "Données manquantes pour la modification." }, { status: 400 })
  }

  const newPassword = await guardedPasswordService.updateGuardPassword({
    id: passwordId,
    title: titre,
    login: login,
    iv: encryptedPasswordData.iv,
    password: Buffer.from(encryptedPasswordData.encryptedPassword, "hex"),
    encryptedAESKey: Buffer.from(encryptedAESKey, "base64"),
  })

  if (!newPassword) {
    return NextResponse.json({ error: "Echec dans la modification du mot de passe." }, { status: 400 })
  }

  return NextResponse.json({ message: "Password modifié avec succes" }, { status: 201 })
}
