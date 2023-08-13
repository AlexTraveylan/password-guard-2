"use client"
import { simplePasswordSchema } from "@/zod/schema.example"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { isCompomisedPassword } from "./functions/password"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"

export function PwnedPassword() {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/
  const [compromisedMessage, setCompromisedMessage] = useState<string | undefined>()
  const [unsafeMessage, setUnsafeMessage] = useState<string | undefined>()
  const form = useForm<z.infer<typeof simplePasswordSchema>>({
    resolver: zodResolver(simplePasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof simplePasswordSchema>) {
    const isCompromised = await isCompomisedPassword(values.password)
    if (isCompromised) {
      setCompromisedMessage("Mot de passe compromis.")
    } else {
      setCompromisedMessage("Non compromis")
    }

    const isSafe = regex.test(values.password)
    if (isSafe) {
      setUnsafeMessage("Assez complexe.")
    } else {
      setUnsafeMessage("Pas assez complexe.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérification d'un mot de passe</CardTitle>
        <CardDescription>Est-il compromis lors une fuite de donnée ?</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe à vérifier</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Vérifier</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        {compromisedMessage && <h3>{compromisedMessage}</h3>}
        {unsafeMessage && <h3>{unsafeMessage}</h3>}
      </CardFooter>
    </Card>
  )
}
