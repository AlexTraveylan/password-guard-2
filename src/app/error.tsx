"use client"

import Image from "next/image"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center flex flex-col gap-3">
      <div>Une erreur s'est produite !</div>
      <Image src="/voleur.jpg" width={700} height={700} alt="Voleur assomé, coffre intact." />
    </div>
  )
}
