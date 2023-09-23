import { currentUser } from "@/lib/hooks/auth"
import { userAppService } from "@/lib/services/userApp.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { email } = currentUser()

  if (!email) {
    return NextResponse.json({ error: "Vous devez être connecté pour créer un mot de passe." }, { status: 401 })
  }

  const searchUser = await userAppService.getByEmail(email)

  if (!searchUser) {
    return NextResponse.json({ error: "Impossible de trouver l'utilisateur." }, { status: 400 })
  }

  return NextResponse.json({ message: "Acces autorisé", publicKey: searchUser.publicKey.toString("utf-8") }, { status: 200 })
}
