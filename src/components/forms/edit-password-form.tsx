"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { generatePassword } from "@/lib/password"
import { encryptPassword, generateAESKey, publicKeyEncrypt } from "@/lib/services/security.service"
import { PassBdd } from "@/lib/types/types"
import { addPasswordSchema } from "@/zod/schema.example"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, RefreshCw, Send } from "../../../node_modules/lucide-react"

export function EditPassword({ setIsEditing, password }: { setIsEditing: Dispatch<SetStateAction<boolean>>; password: PassBdd }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof addPasswordSchema>>({
    resolver: zodResolver(addPasswordSchema),
    defaultValues: {
      titre: `${password.title}`,
      login: `${password.login}`,
      password: "",
    },
  })

  function putStrongRandomPassword() {
    const newPassword = generatePassword()
    form.setValue("password", newPassword)
  }

  async function handleSubmit(values: z.infer<typeof addPasswordSchema>) {
    toast({
      description: "Modification en cours...",
    })

    const aesKey = generateAESKey()
    const encryptedPasswordData = encryptPassword(values.password, aesKey)
    const encryptedPasswordDataJSON = JSON.stringify(encryptedPasswordData)

    const response = await fetch("/api/get-public-key")
    if (!response.ok) {
      return
    }

    const data: { message: string; publicKey: string } = await response.json()

    const publicKey = data.publicKey
    const encryptedAESKey = publicKeyEncrypt(aesKey, publicKey)

    const response2 = await fetch(`/api/passwords/${password.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ titre: values.titre, login: values.login, encryptedPasswordDataJSON, encryptedAESKey }),
    })

    if (response2.ok) {
      setIsEditing(false)
      toast({
        description: "Mot de passe modifié avec succes.",
      })
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        description: "Echec dans la modification du mot de passe.",
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
              <ArrowLeft
                className="cursor-pointer hover:text-red-800 dark:hover:text-red-400"
                strokeWidth={1.3}
                onClick={() => setIsEditing(false)}
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
