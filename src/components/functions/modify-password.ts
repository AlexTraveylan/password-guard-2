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
  const specialChars = "*!$#?"

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
