"use client"

import { InputEye } from "@/components/shared/input-password-eye"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { newMasterPasswordSchema } from "@/zod/schema.example"
import { zodResolver } from "@hookform/resolvers/zod"
import CryptoJS from "crypto-js"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function MasterFormCreate({ setIsSignIn }: { setIsSignIn: (value: boolean) => void }) {
  const form = useForm<z.infer<typeof newMasterPasswordSchema>>({
    resolver: zodResolver(newMasterPasswordSchema),
    defaultValues: {
      email: "",
      master: "",
      confirm: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof newMasterPasswordSchema>) {
    toast({
      description: "Création du mot de passe master en cours ...",
    })

    const envSalt = process.env.NEXT_PUBLIC_SUPERMASTERSALT
    if (!envSalt) return console.error("Probleme d'env")

    const supersalt = envSalt + values.email
    const response = await fetch("api/user", {
      method: "POST",
      body: JSON.stringify({
        hashMaster: CryptoJS.SHA256(supersalt + values.master).toString(CryptoJS.enc.Hex),
        email: values.email,
      }),
    })

    if (response.ok) {
      toast({
        description: "Réussite !",
      })
      setIsSignIn(true)
    } else {
      toast({
        variant: "destructive",
        description: "Echec !",
      })
    }
  }

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Création de ton coffre.</CardTitle>
        <CardDescription>Créer un compte pour protéger tes mots de passe.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="master"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Créer ton coffre.</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <div onClick={() => setIsSignIn(true)} className="cursor-pointer">
          Déjà un coffre ? Clique ici.
        </div>
      </CardFooter>
    </Card>
  )
}
