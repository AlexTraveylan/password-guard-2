"use client"

import { robustTest } from "@/components/functions/validators"
import { PasswordInput } from "@/components/shared/password-input"
import { Button } from "@/components/ui/Button"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import CryptoJS from "crypto-js"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { Lock } from "../../../node_modules/lucide-react"

export function MasterFormCreate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [isValidForm, setIsValidForm] = useState(false)
  const [isPaste, setIsPaste] = useState(false)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast({
      description: "Création du mot de passe master en cours ...",
    })
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const master = formData.get("master")
      const confirm = formData.get("confirm")

      if (master && confirm) {
        const isMasterSecure = regex.test(String(formData.get("master")))
        const isConfirmEqualMaster = String(formData.get("master")) === String(formData.get("confirm"))

        if (isMasterSecure && isConfirmEqualMaster) {
          if (user?.primaryEmailAddress) {
            const envSalt = process.env.NEXT_PUBLIC_SUPERMASTERSALT
            if (!envSalt) return console.error("Probleme d'env")
            const supersalt = envSalt + user.primaryEmailAddress.toString()
            const response = await fetch("api/user", {
              method: "POST",
              body: JSON.stringify({
                hashMaster: CryptoJS.SHA256(supersalt + String(formData.get("master"))).toString(CryptoJS.enc.Hex),
              }),
            })

            if (response.ok) {
              toast({
                description: "Réussite !",
              })
              router.push("/check")
            } else {
              const error: { error: string } = await response.json()
              toast({
                variant: "destructive",
                description: `Erreur : ${error.error}`,
              })
            }
          }
        }
      }
    }
  }

  function validationFormTest() {
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const master = formData.get("master")
      const confirm = formData.get("confirm")

      if (master && confirm) {
        const isMasterSecure = regex.test(String(formData.get("master")))
        const isConfirmEqualMaster = String(formData.get("master")) === String(formData.get("confirm"))
        setIsValidForm(isMasterSecure && isConfirmEqualMaster)
      }
    }
  }

  function samePasswordTest(password: string) {
    if (!formRef.current) {
      return true
    }

    const formData = new FormData(formRef.current)
    const master = String(formData.get("master"))

    return password === master
  }

  return (
    <form ref={formRef} onChange={validationFormTest} onSubmit={handleSubmit} className="flex flex-col items-center">
      <PasswordInput label="Master" name="master" validate={robustTest} validationMessage="Pas assez robuste." />
      <PasswordInput
        label="Confirmation"
        name="confirm"
        validate={samePasswordTest}
        validationMessage="Ne correspond pas."
        onPaste={() => setIsPaste(true)}
      />

      <Button type="submit" disabled={!isValidForm}>
        {isValidForm ? "Commencer" : <Lock />}
      </Button>
      <>
        {isValidForm && (
          <div className="text-orange-600 text-sm mt-2 text-center max-w-xs">
            Attention, si vous perdez ce mot de passe. Vous ne pourrez pas le modifier, ni le recuperer, ni acceder à vos eventuels futurs mots de
            passe enregistrés sur Password Guard.
          </div>
        )}
        {isPaste && (
          <div className="text-red-600 text-sm mt-2 text-center max-w-xs">
            DANGER : Vous avez copié votre mot de passe, soyez certain d'être capable de le réecrire avant de valider.
          </div>
        )}
      </>
    </form>
  )
}
