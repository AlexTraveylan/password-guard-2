import { CheckPasswordForm } from "@/components/forms/check-password-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs"

export default async function ProtectedPage() {
  const user = await currentUser()

  if (!user) {
    throw new Error("Utilisateur non connecté.")
  }

  if (!user?.primaryEmailAddressId) {
    throw new Error("Pas d'adresse e-mail trouvé pour l'utilisateur.")
  }
  const primaryEmail = user.emailAddresses.find((email) => email.id == user.primaryEmailAddressId)
  if (!primaryEmail) {
    throw new Error("Pas d'adresse e-mail trouvé pour l'utilisateur.")
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Vérification de votre identité :</CardTitle>
        <CardDescription>Ne divulgez ce mot de passe à personne.</CardDescription>
        <CardContent>
          <CheckPasswordForm userEmail={primaryEmail.emailAddress} />
        </CardContent>
      </CardHeader>
    </Card>
  )
}
