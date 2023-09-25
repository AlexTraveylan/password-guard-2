"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { generatePassword } from "@/lib/password"
import { encryptPassword, generateAESKey, publicKeyEncrypt } from "@/lib/services/security.service"
import { addPasswordSchema } from "@/zod/schema.example"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MinusCircle, RefreshCw, Send } from "../../../node_modules/lucide-react"

export function AddPasswordForm({ setIsShow }: { setIsShow: Dispatch<SetStateAction<boolean>> }) {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof addPasswordSchema>>({
    resolver: zodResolver(addPasswordSchema),
    defaultValues: {
      titre: "",
      login: "",
      password: "",
    },
  })

  function putStrongRandomPassword() {
    const newPassword = generatePassword()
    form.setValue("password", newPassword)
  }

  async function handleSubmit(values: z.infer<typeof addPasswordSchema>) {
    toast({
      description: "Création du nouveau mot de passe en cours...",
    })

    const aesKey = generateAESKey()
    const encryptedPasswordData = encryptPassword(values.password, aesKey)
    const encryptedPasswordDataJSON = JSON.stringify(encryptedPasswordData)

    const response = await fetch("/api/get-public-key")
    if (!response.ok) {
      toast({
        description: "Une erreur s'est produite.",
        variant: "destructive",
      })
      return
    }

    const data: { message: string; publicKey: string } = await response.json()

    const publicKey = data.publicKey
    const encryptedAESKey = publicKeyEncrypt(aesKey, publicKey)

    const response2 = await fetch("/api/passwords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ titre: values.titre, login: values.login, encryptedPasswordDataJSON, encryptedAESKey }),
    })

    if (response2.ok) {
      setIsShow(false)
      toast({
        description: "Mot de passe crée avec succes.",
      })
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        description: "Une erreur s'est produite.",
      })
    }
  }

  return (
    <div className="w-[255px] h-[240px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>
                <FormField
                  control={form.control}
                  name="titre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Titre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Login" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Mot de passe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex justify-between">
              <MinusCircle
                className="cursor-pointer hover:text-red-800 dark:hover:text-red-400"
                strokeWidth={1.3}
                onClick={() => setIsShow(false)}
              />

              <RefreshCw
                strokeWidth={1.3}
                className="cursor-pointer active:rotate-180 transition-all rotate-0"
                onClick={putStrongRandomPassword}
              />

              <button type="submit">
                <Send className="hover:text-green-800 dark:hover:text-green-400" type="submit" strokeWidth={1.3} />
              </button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
