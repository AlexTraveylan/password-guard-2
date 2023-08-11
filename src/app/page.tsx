import { BtnAccesIfLogged } from "@/components/btn-acces-if-logged"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <Card className="text-center max-w-[500px]">
      <CardHeader>
        <CardTitle>Password Guard</CardTitle>
        <CardDescription>One password for protect all others.</CardDescription>
      </CardHeader>
      <CardContent>
        <BtnAccesIfLogged />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/sandbox">
          <Button>Sandbox</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
