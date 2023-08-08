import jwt from 'jsonwebtoken'

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the envronement.')
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT_REFRESH_SECRET is not defined in the envronement.')
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

export const generateAccessToken = (userEmail: string) => {
  const payload = {
    sub: userEmail,
    type: 'access',
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export const generateRefreshToken = (userEmail: string) => {
  const payload = {
    sub: userEmail,
    type: 'refresh',
  }

  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '1h' })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET)
}
