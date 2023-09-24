import Link from "next/link"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function SandBoxCard() {
  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Tester l'application</CardTitle>
        <CardDescription>Un bac a sable pour tester l'application</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 items-center">
        <div>Accessible uniquement si vous n'avez pas de compte.</div>
        <Button>
          <Link href="/sandbox">Acceder</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
