import prisma from "@/prisma-client"
import { UserApp } from "@prisma/client"

class UserAppService {
  async create({ name, email, masterPassword, salt, privateKey, publicKey }: Omit<UserApp, "id">) {
    const userApp = await prisma.userApp.create({
      data: {
        name,
        email,
        masterPassword,
        salt,
        privateKey,
        publicKey,
      },
    })
    return userApp
  }

  async getByEmail(email: string) {
    const userApp = await prisma.userApp.findUnique({
      where: {
        email,
      },
    })
    return userApp
  }
}

export const userAppService = new UserAppService()
