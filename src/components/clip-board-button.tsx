"use client"
import { Button } from "@/ui/Button"
import { Key, User } from "lucide-react"
import { useState } from "react"

export function CopyToClipboardButton({ password, btnType }: { password: string; btnType: "user" | "password" }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(password)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 10000)
    } catch (err) {
      console.error("Erreur lors de la copie dans le presse-papier", err)
    }
  }

  const svg = btnType === "user" ? <User /> : <Key />

  return (
    <Button size={"lg"} onClick={copyToClipboard} variant="border">
      {isCopied ? "Copié!" : svg}
    </Button>
  )
}

export default CopyToClipboardButton
