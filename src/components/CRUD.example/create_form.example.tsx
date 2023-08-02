"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(10).max(1024),
})

export function CreateExampleForm({ getArticles }: { getArticles: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const title = values.title
    const content = values.content

    const response = await fetch("api/crud.example", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, content: content }),
    })

    if (!response.ok) {
      console.error("Create fail")
    } else {
      console.log("Create succes")
      getArticles()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-[360px] space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The title for your example article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The content of your example article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create new article</Button>
      </form>
    </Form>
  )
}
