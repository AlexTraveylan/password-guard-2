import { AddPasswordCard } from "@/components/add-password-card"
import { PasswordCard } from "@/components/password_card"
import { PasswordsHealthCard } from "@/components/passwords-health"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@/lib/hooks/auth"
import { guardedPasswordService } from "@/lib/services/GuardedPassword.service"
import { decryptPassword, privateKeyDecrypt } from "@/lib/services/security.service"
import { userAppService } from "@/lib/services/userApp.service"
import { PassBdd, encryptData } from "@/lib/types/types"
import Image from "next/image"
import Link from "next/link"
import { Home } from "../../../node_modules/lucide-react"

export default async function SandBoxPage() {
  const sandBoxUser = await userAppService.getByEmail("noemail@sandbox.com")
  const { email } = currentUser()

  if (email) {
    throw new Error("Déconnectez-vous pour utiliser la sandbox.")
  }

  if (!sandBoxUser) {
    throw new Error("Impossible de trouver le sandbox user.")
  }
  const privateKeyBuffer = sandBoxUser.privateKey

  const passwords = await guardedPasswordService.getAllGuardedPasswordByUserID(sandBoxUser.id)
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
    <div>
      <div className="flex gap-5 flex-wrap justify-center">
        <Card className="w-[240px] min-h-[240px]">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <h3>
                Bac à sable <span className="text-xs">(partagé)</span>
              </h3>

              <Link href="/">
                <Home className="hover:text-red-800 dark:hover:text-red-500 transition-colors" />
              </Link>
            </CardTitle>
            <CardDescription className="text-xs">
              Accessible aux utilisateurs non connectés pour tester les fonctionnalités de Password Guard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3>Règles :</h3>
            <ul>
              <li className="pl-5">Pas d'insulte</li>
              <li className="pl-5">Pas de lien</li>
            </ul>
          </CardContent>
          <CardFooter>
            <h3 className="text-xs">En développement ...</h3>
          </CardFooter>
        </Card>
        <Image src="/coffre-sable.jpg" alt="coffre en bois dans du sable" width={240} height={240} />
        <PasswordsHealthCard passBdds={passBdds} />
      </div>
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
