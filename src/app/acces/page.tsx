import { MasterFormCreate } from "@/components/forms/master-form-create"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { userAppService } from "@/services/userApp.service"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function AccesPage() {
  const user = await currentUser()

  if (!user?.primaryEmailAddressId) {
    throw new Error("Pas d'adresse e-mail trouvé pour l'utilisateur.")
  }
  const primaryEmail = user.emailAddresses.find((email) => email.id == user.primaryEmailAddressId)
  if (!primaryEmail) {
    throw new Error("Pas d'adresse e-mail trouvé pour l'utilisateur.")
  }

  const searchedUser = await userAppService.getByEmail(primaryEmail.emailAddress)
  if (searchedUser) {
    redirect("/check")
  } else {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Choississez votre Master Password.</CardTitle>
          <CardDescription>Assurez-vous d'avoir une connexion sécurisée lors de la création de votre master password.</CardDescription>
        </CardHeader>
        <CardContent>
          <MasterFormCreate />
        </CardContent>
        <CardFooter>
          Il doit posseder au minimum 15 caractères, une minuscule, une MAJUSCULE, un chiffre, un caractère spécial (Parmi : $ * % @ ! ? &)
        </CardFooter>
      </Card>
    )
  }
}
