import { Description } from "@/components/description"
import { PwnedPassword } from "@/components/pwned-password"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs"
import Link from "next/link"

export default async function Home() {
  const user = await currentUser()

  return (
    <div className="flex flex-col gap-5">
      <Card className="text-center max-w-[500px]">
        <CardHeader>
          <CardTitle>Password Guard</CardTitle>
          <CardDescription>One password for protect all others.</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <Link href="/acces">
              <Button>Entrer</Button>
            </Link>
          ) : (
            <Description />
          )}
        </CardContent>
        {!user && (
          <CardFooter className="flex justify-center">
            <Link href="/sandbox">
              <Button>Sandbox</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
      <PwnedPassword />
    </div>
  )
}
