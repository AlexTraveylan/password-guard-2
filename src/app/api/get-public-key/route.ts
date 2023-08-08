import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const user = await currentUser()

  if (!user?.primaryEmailAddressId) {
    return NextResponse.json({ error: "Impossible de trouver l&apose-mail." }, { status: 400 })
  }
  const primaryEmail = user.emailAddresses.find((email) => email.id == user.primaryEmailAddressId)
  if (!primaryEmail) {
    return NextResponse.json({ error: "Impossible de trouver l&apose-mail." }, { status: 400 })
  }

  const searchUser = await userAppService.getByEmail(primaryEmail.emailAddress)

  if (!searchUser) {
    return NextResponse.json({ error: "Impossible de trouver l&aposuser." }, { status: 400 })
  }

  return NextResponse.json({ message: "Acces autorisé", publicKey: searchUser.publicKey.toString("utf-8") }, { status: 200 })
}
