import jwt, { JwtPayload } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the envronement.")
}

if (!JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is not defined in the envronement.")
}

interface AccessTokenPayload extends JwtPayload {
  sub: string
  type: "access" | "refresh"
  private_key: string
}

export const generateAccessToken = (userEmail: string, privateKey: string) => {
  const payload: AccessTokenPayload = {
    sub: userEmail,
    type: "access",
    private_key: privateKey,
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export const generateRefreshToken = (userEmail: string, privateKey: string): string => {
  const payload: AccessTokenPayload = {
    sub: userEmail,
    type: "refresh",
    private_key: privateKey,
  }

  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "1h" })
}

export const verifyAccessToken = (token: string): AccessTokenPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AccessTokenPayload
    return payload
  } catch (err) {
    return null
  }
}

export const verifyRefreshToken = (token: string): AccessTokenPayload | null => {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET) as AccessTokenPayload
    return payload
  } catch (err) {
    return null
  }
}
