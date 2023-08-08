import { generateAccessToken, generateRefreshToken } from "@/services/auth.service"
import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
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
    return NextResponse.json({ error: "Impossible de trouver l&aposutilisateur.." }, { status: 400 })
  }

  const salt = searchUser.salt
  const masterPassword = searchUser.masterPassword
  const { clientHashedMaster } = await request.json()
  const clientDoubleHashedMaster = await bcrypt.hash(clientHashedMaster, salt)
  const clientDoubleHashedMasterBuffer = Buffer.from(clientDoubleHashedMaster)

  if (!clientDoubleHashedMasterBuffer.equals(masterPassword)) {
    return NextResponse.json({ error: "Le mot de passe est incorrect." }, { status: 400 })
  }

  const accessToken = generateAccessToken(primaryEmail.emailAddress)
  const refreshToken = generateRefreshToken(primaryEmail.emailAddress)
  const privateKey = searchUser.privateKey.toString("utf-8")

  const cookieHeaders = cookies()
  cookieHeaders.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60,
    path: "/",
  })

  cookieHeaders.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  })

  return NextResponse.json({ message: "Correspondance ok", privateKey: privateKey })
}
