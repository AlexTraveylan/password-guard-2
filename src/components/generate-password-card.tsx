"use client"
import { generatePassword } from "@/lib/password"
import { useEffect, useState } from "react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function GeneratePasswordCard() {
  const [password, setPassword] = useState("")

  const handleClick = () => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Générateur de mot de passe fort.</CardTitle>
        <CardDescription>
          Génére automatiquement un mot de passe avec 15 caractères aléatoires dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
        </CardDescription>
        <CardContent className="flex flex-col gap-5 items-center">
          <code className="text-sm">{password}</code>
          <Button onClick={handleClick}>Générer</Button>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
