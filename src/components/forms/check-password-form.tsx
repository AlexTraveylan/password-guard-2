"use client"
import { PasswordInput } from "@/components/shared/password-input"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/use-toast"
import CryptoJS from "crypto-js"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CheckPasswordForm({ userEmail }: { userEmail: string }) {
  const [isChecking, setIsChecking] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function checkPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsChecking(true)
    toast({
      description: "Vérification du mot de passe en cours ...",
    })
    const formData = new FormData(event.target as HTMLFormElement)
    const envSalt = process.env.NEXT_PUBLIC_SUPERMASTERSALT
    if (!envSalt) return console.error("Probleme d'env")
    const supersalt = envSalt + userEmail

    const hashedMaster = CryptoJS.SHA256(supersalt + String(formData.get("master"))).toString(CryptoJS.enc.Hex)

    const response = await fetch("api/check-master", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientHashedMaster: hashedMaster }),
    })

    if (response.ok) {
      const data: { message: string; privateKey: string } = await response.json()
      localStorage.setItem("privateKey", data.privateKey)
      toast({
        description: "Accès autorisé pour 1h.",
      })
      router.push("/view-passwords")
    }

    const data: { error: string } = await response.json()
    toast({
      variant: "destructive",
      title: "Oh, oh ! Une erreur s'est produite !",
      description: `Raison : ${data.error}`,
    })

    setIsChecking(false)
  }

  return (
    <form onSubmit={checkPassword} className="flex flex-col items-center gap-3 mt-5">
      <PasswordInput label="Master" name="master" />
      <Button className="mt-1" type="submit" disabled={isChecking}>
        Déverouiller
      </Button>
    </form>
  )
}
