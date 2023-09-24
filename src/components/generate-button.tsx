"use client"

import { Button } from "@/components/ui/Button"
import { generatePassword } from "@/lib/password"
import { useEffect, useState } from "react"
import { Copy } from "../../node_modules/lucide-react"

export function GenerateButton() {
  const [password, setPassword] = useState("")
  const handleClick = () => {
    const newPassword = generatePassword()
    setPassword(newPassword)
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(password)
    } catch (err) {
      console.error("Erreur lors de la copie dans le presse-papier", err)
    }
  }

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <>
      {password.length > 0 && (
        <div className="flex gap-5">
          <code className="text-sm">{password}</code>
          <Copy size={19.0} className="cursor-pointer active:scale-110" onClick={() => copyToClipboard()} />
        </div>
      )}
      <Button onClick={handleClick}>Générer</Button>
    </>
  )
}
