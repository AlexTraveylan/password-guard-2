import { PassBdd } from "@/components/types/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dispatch, SetStateAction } from "react"
import { ArrowLeft } from "../../node_modules/lucide-react"
import { splitPassword } from "./functions/modify-password"

export function PasswordDetail({ password, setIsShowDetail }: { password: PassBdd; setIsShowDetail: Dispatch<SetStateAction<boolean>> }) {
  const splitedPassword = splitPassword(password.password)
  const splitedLogin = splitPassword(password.login)

  return (
    <Card className="w-[240px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{password.title}</CardTitle>
        <CardDescription>Détails carte n°{password.id}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div>
          <div className="font-semibold">Login :</div>
          {splitedLogin.map((line, index) => {
            return (
              <div className="text-slate-600 dark:text-slate-400" key={`${index * 100}${line}`}>
                {line}
              </div>
            )
          })}
        </div>
        <div>
          <div className="font-semibold">Mot de passe :</div>
          {splitedPassword.map((line, index) => {
            return (
              <div className="text-slate-600 dark:text-slate-400" key={`${index * 1000}${line}`}>
                {line}
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div onClick={() => setIsShowDetail(false)}>
          <ArrowLeft className="cursor-pointer hover:text-red-800 dark:hover:text-red-400" size={23} strokeWidth={1.3} />
        </div>
      </CardFooter>
    </Card>
  )
}
