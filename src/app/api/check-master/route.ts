import { generateAccessToken, generateRefreshToken } from "@/lib/services/auth.service"
import { userAppService } from "@/lib/services/userApp.service"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { clientHashedMaster, email } = await request.json()

  const searchUser = await userAppService.getByEmail(email)

  if (!searchUser) {
    return NextResponse.json({ error: "Impossible de trouver l'utilisateur.." }, { status: 400 })
  }

  const salt = searchUser.salt
  const masterPassword = searchUser.masterPassword
  const clientDoubleHashedMaster = await bcrypt.hash(clientHashedMaster, salt)
  const clientDoubleHashedMasterBuffer = Buffer.from(clientDoubleHashedMaster)

  if (!clientDoubleHashedMasterBuffer.equals(masterPassword)) {
    return NextResponse.json({ error: "Le mot de passe est incorrect." }, { status: 400 })
  }

  const accessToken = generateAccessToken(email, searchUser.privateKey.toString("utf-8"))
  const refreshToken = generateRefreshToken(email, searchUser.privateKey.toString("utf-8"))

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

  return NextResponse.json({ message: "Correspondance ok" })
}
