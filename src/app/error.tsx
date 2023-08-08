"use client"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const { toast } = useToast()
  useEffect(() => {
    console.error(error)
    toast({
      variant: "destructive",
      title: "Oh, oh ! Une erreur s&aposest produite !",
      description: `Message d&aposerreur : ${error}`,
      action: (
        <ToastAction altText="Try again" onClick={() => reset()}>
          Try again
        </ToastAction>
      ),
    })
  }, [error])

  return (
    <div className="text-center">
      <h1>Une erreur s&aposest produite</h1>
      <Image src="/voleur.jpg" width={700} height={700} alt="Voleur assomé, coffre intact." />
    </div>
  )
}
