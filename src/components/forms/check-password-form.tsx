"use client"
import { InputEye } from "@/components/shared/input-password-eye"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { checkMasterPasswordSchema } from "@/zod/schema.example"
import { zodResolver } from "@hookform/resolvers/zod"
import CryptoJS from "crypto-js"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function CheckPasswordForm({ setIsSignIn }: { setIsSignIn: (value: boolean) => void }) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof checkMasterPasswordSchema>>({
    resolver: zodResolver(checkMasterPasswordSchema),
    defaultValues: {
      email: "",
      master: "",
    },
  })

  async function checkPassword(values: z.infer<typeof checkMasterPasswordSchema>) {
    toast({
      description: "Vérification du mot de passe en cours ...",
    })
    const envSalt = process.env.NEXT_PUBLIC_SUPERMASTERSALT
    if (!envSalt) return console.error("Probleme d'env")

    const supersalt = envSalt + values.email

    const hashedMaster = CryptoJS.SHA256(supersalt + values.master).toString(CryptoJS.enc.Hex)

    const response = await fetch("api/check-master", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientHashedMaster: hashedMaster, email: values.email }),
    })

    if (response.ok) {
      toast({
        description: "Accès autorisé pour 1h.",
      })
      router.push("/view-passwords")
    } else {
      toast({
        variant: "destructive",
        title: "Oh, oh ! Une erreur s'est produite !",
      })
    }
  }

  return (
    <Card className="min-w-[350px] w-screen max-w-[700px]">
      <CardHeader>
        <CardTitle>Déverouille ton coffre.</CardTitle>
        <CardDescription>Accède à tes mots de passe.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(checkPassword)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Dévérouille ton coffre.</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end">
        <div onClick={() => setIsSignIn(false)} className="cursor-pointer">
          Pas encore de coffre ? Clique ici.
        </div>
      </CardFooter>
    </Card>
  )
}
