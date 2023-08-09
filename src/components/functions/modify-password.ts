export function splitPassword(password: string, splitedPassword: string[] = []): string[] {
  if (password.length > 24) {
    splitedPassword.push(`${password.slice(0, 24)}`)
    return splitPassword(password.slice(24), splitedPassword)
  } else {
    splitedPassword.push(password)
    return splitedPassword
  }
}
