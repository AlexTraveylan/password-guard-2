"use client"
import { simplePasswordSchema } from "@/zod/schema.example"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTimedMessage } from "../lib/hooks/timed-message"
import { isCompomisedPassword } from "../lib/password"
import { InputEye } from "./shared/input-password-eye"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"

export function PwnedPassword() {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/
  const [compromisedMessage, pushCompromisedMessage] = useTimedMessage()
  const [unsafeMessage, pushUnsafeMessage] = useTimedMessage()
  const form = useForm<z.infer<typeof simplePasswordSchema>>({
    resolver: zodResolver(simplePasswordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof simplePasswordSchema>) {
    const isCompromised = await isCompomisedPassword(values.password)
    if (isCompromised) {
      pushCompromisedMessage("Mot de passe compromis.")
    } else {
      pushCompromisedMessage("Non compromis")
    }

    const isSafe = regex.test(values.password)
    if (isSafe) {
      pushUnsafeMessage("Assez complexe.")
    } else {
      pushUnsafeMessage("Pas assez complexe.")
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
                    <InputEye {...field} />
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
