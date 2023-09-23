import { AddPasswordCard } from "@/components/add-password-card"
import { PasswordCard } from "@/components/password_card"
import { PasswordsHealthCard } from "@/components/passwords-health"
import AccessDenied from "@/components/shared/access-denied"
import { currentUser } from "@/lib/hooks/auth"
import { guardedPasswordService } from "@/lib/services/GuardedPassword.service"
import { decryptPassword, privateKeyDecrypt } from "@/lib/services/security.service"
import { userAppService } from "@/lib/services/userApp.service"
import { PassBdd, encryptData } from "@/lib/types/types"

export default async function ViewPasswordsPage() {
  const { email, privateKey } = currentUser()

  if (!email) return <AccessDenied />
  if (!privateKey) throw new Error("Pas de clé privée")

  const privateKeyBuffer = Buffer.from(privateKey, "utf-8")

  const cUser = await userAppService.getByEmail(email)
  if (!cUser) {
    throw new Error("Impossible de trouver l'utilisateur.")
  }

  const passwords = await guardedPasswordService.getAllGuardedPasswordByUserID(cUser.id)
  if (!passwords) {
    throw new Error("Echec dans la récupération des mots de passe.")
  }

  const passBdds: PassBdd[] = []

  for (const password of passwords) {
    const encryptedData: encryptData = {
      iv: password.iv,
      encryptedPassword: password.password.toString("hex"),
    }

    const decryptedAESKey = privateKeyDecrypt(password.encryptedAESKey, privateKeyBuffer)
    const decryptedPassword = decryptPassword(encryptedData, decryptedAESKey)

    passBdds.push({ id: password.id, title: password.title, login: password.login, password: decryptedPassword })
  }

  return (
    <div className="flex flex-col items-center">
      <PasswordsHealthCard passBdds={passBdds} />
      <div className="flex flex-row gap-3 flex-wrap justify-center my-5">
        {passBdds
          .sort((a, b) => a.id - b.id)
          .map((password) => {
            return (
              <div key={password.id}>
                <PasswordCard password={password} />
              </div>
            )
          })}
        <AddPasswordCard />
      </div>
    </div>
  )
}
