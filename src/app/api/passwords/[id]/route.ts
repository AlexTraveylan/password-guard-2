import { guardedPasswordService } from "@/services/GuardedPassword.service"
import { verifyAccessToken } from "@/services/auth.service"
import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
