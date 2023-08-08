"use client"

import { useRouter } from "next/navigation"
import { PassBdd } from "./types/types"
import { Button } from "./ui/Button"
import { useToast } from "./ui/use-toast"

export function DeletePasswordCard({ password }: { password: PassBdd }) {
  const { toast } = useToast()
  const router = useRouter()

  async function handleDeletePassword() {
    const guardedPasswordId = password.id
    const response = await fetch(`/api/passwords/${guardedPasswordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ guardedPasswordId }),
    })

    if (response.ok) {
      toast({
        description: "Suppression effectuée avec succès.",
      })
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        description: "Echec de la suppression.",
      })
    }
  }

  return (
    <Button variant="destructive" onClick={() => handleDeletePassword()}>
      Confirmer la suppression
    </Button>
  )
}
