"use client"

import Image from "next/image"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="text-center">
      <h1>Une erreur s&aposest produite</h1>
      <Image src="/voleur.jpg" width={700} height={700} alt="Voleur assomé, coffre intact." />
    </div>
  )
}
