"use client"
import { Input } from "@/components/shared/input"
import { Button } from "@/components/ui/Button"
import { useToast } from "@/components/ui/use-toast"
import { encryptPassword, generateAESKey, publicKeyEncrypt } from "@/services/security.service"
import { Dispatch, SetStateAction, useRef } from "react"

export function AddPasswordForm({
  isShow,
  setIsShow,
  recupPasswords,
}: {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  recupPasswords: () => Promise<void>
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()

    if (!formRef.current) {
      return
    }

    const formData = new FormData(formRef.current)
    const titre = String(formData.get("titre"))
    const login = String(formData.get("login"))
    const password = String(formData.get("password"))

    // Chiffrez le mot de passe à l'aide d'une clé AES
    const aesKey = generateAESKey()
    const encryptedPasswordData = encryptPassword(password, aesKey)
    const encryptedPasswordDataJSON = JSON.stringify(encryptedPasswordData)

    const response = await fetch("/api/get-public-key")
    if (!response.ok) {
      return
    }

    const data: { message: string; publicKey: string } = await response.json()

    // Chiffrez la clé AES à l'aide de la clé publique RSA de l'utilisateur
    const publicKey = data.publicKey
    const encryptedAESKey = publicKeyEncrypt(aesKey, publicKey)

    const response2 = await fetch("/api/passwords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ titre, login, encryptedPasswordDataJSON, encryptedAESKey }),
    })

    if (response2.ok) {
      recupPasswords()
      setIsShow(false)
      toast({
        description: "Mot de passe crée avec succes.",
      })
    } else {
      toast({
        variant: "destructive",
        description: "Echec dans la création d'un nouveau mot de passe.",
      })
    }
  }

  if (!isShow) {
    return <></>
  }

  return (
    <form ref={formRef} className="flex flex-col items-center shadow-md p-5 rounded-md">
      <Input label="Titre" type="text" name="titre" />
      <Input label="Login" type="text" name="login" />
      <Input label="Password" type="password" name="password" />
      <div onClick={(e) => handleSubmit(e)} className="text-center">
        <Button>Nouveau mot de passe</Button>
      </div>
    </form>
  )
}
