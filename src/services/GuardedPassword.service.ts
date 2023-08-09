import prisma from "@/prisma-client"
import { GuardedPassword } from "@prisma/client"

class GuardedPasswordService {
  async createGuardPassword({ title, login, iv, password, encryptedAESKey, userId }: Omit<GuardedPassword, "id">) {
    const guardedPassword = await prisma.guardedPassword.create({
      data: {
        title,
        login,
        iv,
        password,
        encryptedAESKey,
        userId,
      },
    })
    return guardedPassword
  }

  async updateGuardPassword({ id, title, login, iv, password, encryptedAESKey }: Omit<GuardedPassword, "userId">) {
    const guardedPassword = await prisma.guardedPassword.update({
      where: { id },
      data: {
        title,
        login,
        iv,
        password,
        encryptedAESKey,
      },
    })
    return guardedPassword
  }

  async getGuardedPasswordById(id: number) {
    const guardedPassword = await prisma.guardedPassword.findUnique({
      where: { id },
    })

    return guardedPassword
  }

  async deleteGuardedPasswordById(id: number) {
    const guardedPassword = await prisma.guardedPassword.delete({
      where: { id },
    })

    return guardedPassword
  }

  async getAllGuardedPasswordByUserID(userId: number) {
    const guardedPasswords = await prisma.guardedPassword.findMany({
      where: {
        userId: userId,
      },
    })
    return guardedPasswords
  }
}

export const guardedPasswordService = new GuardedPasswordService()
