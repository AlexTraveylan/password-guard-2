import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center">
      <Card className="text-center border-none">
        <CardHeader>
          <CardTitle>Accès refusé</CardTitle>
          <CardDescription>Vous ne passerez pas !</CardDescription>
        </CardHeader>
        <CardContent>
          <Image src="/mage.png" alt="mage qui bloque le passage" width={700} height={700} />
        </CardContent>
      </Card>
    </div>
  )
}
