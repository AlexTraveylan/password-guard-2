"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { pluralize } from "@/lib/format"
import { isCompomisedPassword } from "@/lib/password"
import { PassBdd } from "@/lib/types/types"
import { useState } from "react"
import { Radar } from "../../node_modules/lucide-react"

export function PasswordsHealthCard({ passBdds }: { passBdds: PassBdd[] }) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{14,}$/
  const [vulnerabilities, setVulnerabilities] = useState<PassBdd[]>([])
  const [weaks, setWeaks] = useState<PassBdd[]>([])
  const [nbCompromised, setNbCompromised] = useState(0)
  const [nbWeak, setNbWeak] = useState(0)
  const [passwordChecked, setPasswordCheacked] = useState(false)
  const { toast } = useToast()

  async function findVulnerabilities() {
    setVulnerabilities([])
    setWeaks([])
    toast({
      description: "Recherche des vulnérabilités en cours.",
    })
    for (const passBdd of passBdds) {
      const isNotWeak = regex.test(passBdd.password)
      if (!isNotWeak) {
        setWeaks((curr) => [...curr, passBdd])
      }
      const isCompromised = await isCompomisedPassword(passBdd.password)
      if (isCompromised) {
        setVulnerabilities((curr) => [...curr, passBdd])
      }
    }
    setNbCompromised(vulnerabilities.length)
    setNbWeak(weaks.length)
    setPasswordCheacked(true)
    toast({
      description: "Recherche des vulnérabilités terminées.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Bilan de sécurité</div>
          <Radar strokeWidth={1.3} size={23} onClick={findVulnerabilities} className="cursor-pointer transition-colors hover:text-green-500" />
        </CardTitle>
        <CardDescription>Check fuites et faiblesses des mdp.</CardDescription>
      </CardHeader>
      {passwordChecked && (
        <CardContent className="flex flex-col gap-2">
          <div>
            <div>
              {nbCompromised} {pluralize(nbCompromised, "mot")} de passe compromis
            </div>
            <ul>
              {vulnerabilities.map((passBdd) => (
                <li className="text-red-700 dark:text-red-500 pl-5">
                  {passBdd.title} (Carte n°{passBdd.id})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              {nbWeak} {pluralize(nbCompromised, "mot")} de passe {pluralize(nbCompromised, "faible")}
            </div>
            <ul>
              {weaks.map((passBdd) => (
                <li className="text-orange-600 dark:text-orange-400 pl-5">
                  {passBdd.title} (Carte n°{passBdd.id})
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
