import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PassBdd } from "@/lib/types/types"
import { Dispatch, SetStateAction } from "react"
import { ArrowLeft } from "../../node_modules/lucide-react"

export function PasswordDetail({ password, setIsShowDetail }: { password: PassBdd; setIsShowDetail: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Card className="w-[255px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <div>{password.title}</div>
        </CardTitle>
        <CardDescription className="flex flex-row justify-between">
          <h3>Détails carte n°{password.id}</h3>
          <div onClick={() => setIsShowDetail(false)}>
            <ArrowLeft className="cursor-pointer hover:text-red-800 dark:hover:text-red-400" size={23} strokeWidth={1.3} />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div>
          <div className="font-semibold">Login :</div>
          <div className="break-words">{password.login}</div>
        </div>
        <div>
          <div className="font-semibold">Mot de passe :</div>
          <div className="break-words">{password.password}</div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
