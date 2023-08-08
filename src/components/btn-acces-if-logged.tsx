import { currentUser } from "@clerk/nextjs"
import Link from "next/link"
import { Description } from "./description"
import { Button } from "./ui/Button"

export const BtnAccesIfLogged = async () => {
  const user = await currentUser()

  if (!user) {
    return <Description />
  }

  return (
    <Link href="/acces">
      <Button>Entrer</Button>
    </Link>
  )
}
