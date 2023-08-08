export function splitPassword(password: string, splitedPassword: string[]): string[] {
  if (password.length > 25) {
    splitedPassword.push(`${password.slice(0, 25)}`)
    return splitPassword(password.slice(25), splitedPassword)
  } else {
    splitedPassword.push(password)
    return splitedPassword
  }
}
