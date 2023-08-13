import { createHash } from "crypto"

export function splitPassword(password: string, splitedPassword: string[] = []): string[] {
  if (password.length > 24) {
    splitedPassword.push(`${password.slice(0, 24)}`)
    return splitPassword(password.slice(24), splitedPassword)
  } else {
    splitedPassword.push(password)
    return splitedPassword
  }
}

export function generatePassword(length: number = 15): string {
  if (length < 4) {
    throw new Error("La longueur du mot de passe doit être d'au moins 4 caractères pour satisfaire toutes les conditions.")
  }

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numberChars = "0123456789"
  const specialChars = "@$!%*?&"

  let password = [
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
    numberChars[Math.floor(Math.random() * numberChars.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ].join("")

  const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
}

export async function isCompomisedPassword(password: string): Promise<boolean> {
  const sha1 = createHash("sha1")
  const passwordHash = sha1.update(password).digest("hex").toUpperCase()

  const prefix = passwordHash.substring(0, 5)
  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
  const data = await response.text()

  const suffixes = data.split("\r\n")
  for (const suffix of suffixes) {
    if (passwordHash === prefix + suffix.split(":")[0]) {
      return true
    }
  }
  return false
}
