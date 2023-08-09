"use client"
import { useState } from "react"
import { MinusCircleIcon, PlusCircleIcon } from "../../node_modules/lucide-react"
import { AddPasswordForm } from "./forms/add-password-form"

export function NewPassword({ recupPasswords }: { recupPasswords: () => Promise<void> }) {
  const [isShow, setIsShow] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <h1>Ajouter un mot de passe :</h1>
      {isShow ? <MinusCircleIcon size={30} onClick={() => setIsShow(!isShow)} /> : <PlusCircleIcon size={30} onClick={() => setIsShow(!isShow)} />}
      <AddPasswordForm setIsShow={setIsShow} recupPasswords={recupPasswords} />
    </div>
  )
}
