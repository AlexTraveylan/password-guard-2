"use client"
import { Button } from "@/components/ui/Button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export default function ToastDemo() {
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)
  const error = "Flemme"

  useEffect(() => {
    setIsClient(true)
    toast({
      variant: "destructive",
      title: "Oh, oh ! Une erreur s'est produite !",
      description: `Message d'erreur : ${error}`,
      action: (
        <ToastAction altText="Try again" onClick={() => console.log(error)}>
          Try again
        </ToastAction>
      ),
    })
  }, [])

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
  )
}
