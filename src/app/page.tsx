import BtnAccesIfLogged from "@/components/btn-acces-if-logged"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Password Guard</CardTitle>
        <CardDescription>One password for protect all others.</CardDescription>
      </CardHeader>
      <CardContent>
        <BtnAccesIfLogged />
      </CardContent>
    </Card>
  )
}
