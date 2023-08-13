import { pluralize } from "./functions/format"
import { isCompomisedPassword } from "./functions/password"
import { PassBdd } from "./types/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export async function PasswordsHealthCard({ passBdds }: { passBdds: PassBdd[] }) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/
  const vulnerabilities: PassBdd[] = []
  const weaks: PassBdd[] = []
  for (const passBdd of passBdds) {
    const isNotWeak = regex.test(passBdd.password)
    if (!isNotWeak) {
      weaks.push(passBdd)
    }
    const isCompromised = await isCompomisedPassword(passBdd.password)
    if (isCompromised) {
      vulnerabilities.push(passBdd)
    }
  }

  const nbCompromised = vulnerabilities.length
  const nbWeak = weaks.length
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bilan de sécurité</CardTitle>
        <CardDescription>Check fuites et faiblesses des mdp.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>
          <h3>
            {nbCompromised} {pluralize(nbCompromised, "mot")} de passe compromis
          </h3>
          <ul>
            {vulnerabilities.map((passBdd) => (
              <li className="text-red-700 dark:text-red-500 pl-5">
                {passBdd.title} (Carte n°{passBdd.id})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>
            {nbWeak} {pluralize(nbCompromised, "mot")} de passe {pluralize(nbCompromised, "faible")}
          </h3>
          <ul>
            {weaks.map((passBdd) => (
              <li className="text-orange-600 dark:text-orange-400 pl-5">
                {passBdd.title} (Carte n°{passBdd.id})
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
