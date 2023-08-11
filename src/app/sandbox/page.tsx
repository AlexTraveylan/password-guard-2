import { AddPasswordCard } from "@/components/add-password-card"
import { PasswordCard } from "@/components/password_card"
import { PassBdd, encryptData } from "@/components/types/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { guardedPasswordService } from "@/services/GuardedPassword.service"
import { decryptPassword, privateKeyDecrypt } from "@/services/security.service"
import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "../../../node_modules/lucide-react"

export default async function SandBoxPage() {
  const sandBoxUser = await userAppService.getByEmail("noemail@sandbox.com")
  const user = await currentUser()

  if (user) {
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
        <Image src="/coffre-sable.jpg" alt="coffre en bois dans du sable" width={240} height={240} />
        <Card className="w-[240px] min-h-[240px]">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <h3>
                Bac à sable <span className="text-xs">(partagé)</span>
              </h3>
              <Link href="/">
                <ArrowLeft className="hover:text-red-800 dark:hover:text-red-500 transition-colors" />
              </Link>
            </CardTitle>
            <CardDescription className="text-xs">
              Accessible aux utilisateurs non connectés pour tester les fonctionnalités de Password Guard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3>Règles :</h3>
            <ul>
              <li>- Pas d'insulte</li>
              <li>- Pas de liens</li>
            </ul>
          </CardContent>
          <CardFooter>
            <h3 className="text-xs">En développement ...</h3>
          </CardFooter>
        </Card>
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
