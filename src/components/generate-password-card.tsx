import { GenerateButton } from "./generate-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export async function GeneratePasswordCard() {
  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Générateur de mot de passe fort.</CardTitle>
        <CardDescription>
          Génére automatiquement un mot de passe avec 15 caractères aléatoires dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.
        </CardDescription>
        <CardContent className="flex flex-col gap-5 items-center pt-3">
          <GenerateButton />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
