import { verifyAccessToken } from "@/lib/services/auth.service"
import { cookies } from "next/headers"

export const currentUser: () => { email: string | null; privateKey?: string | null } = () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  let email = null
  let privateKey = null

  if (!accessToken) {
    return { email, privateKey }
  }

  const payload = verifyAccessToken(accessToken.value)
  if (!payload) {
    return { email, privateKey }
  }

  const { sub, private_key } = payload
  email = sub
  privateKey = private_key

  return { email, privateKey }
}
