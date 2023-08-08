"use client"
import CopyToClipboardButton from "@/components/clipBoardButton"
import { splitPassword } from "@/components/functions/modify-password"
import { PassBdd } from "@/components/types/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Eye, PenBox, Trash2 } from "../../node_modules/lucide-react"
import { Button } from "./ui/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"

export function PasswordCard({ password, recupPasswords }: { password: PassBdd; recupPasswords: () => void }) {
  const [show, setShow] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const passwordText = splitPassword(password.password, [])

  async function handleDeletePassword() {
    setIsDeleting(true)
    const guardedPasswordId = password.id
    const response = await fetch(`/api/passwords/${guardedPasswordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ guardedPasswordId }),
    })

    if (response.ok) {
      recupPasswords()
      toast({
        description: "Suppression effectuée avec succès.",
      })
    } else {
      toast({
        variant: "destructive",
        description: "Echec de la suppression.",
      })
    }
    setIsDeleting(false)
  }

  return (
    <div key={password.id} className="relative">
      <Card className="w-[240px] h-[240px]">
        <CardHeader>
          <CardTitle>
            <p>{password.title}</p>
          </CardTitle>
          <CardDescription className="flex flex-row justify-between">
            <p>Carte n°{password.id}</p>
            <Popover>
              <PopoverTrigger>
                <Eye strokeWidth={1.3} size={23} />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-center">
                <h3>{password.login}</h3>
                <Separator className="bg-slate-500 my-1" />
                <div>
                  {passwordText.map((line) => {
                    return <h3>{line}</h3>
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-center gap-3 py-3">
          <CopyToClipboardButton password={password.login} btnType="user" />
          <CopyToClipboardButton password={password.password} btnType="password" />
        </CardContent>
        <CardFooter className="flex flex-row justify-end gap-5">
          <PenBox strokeWidth={1.3} size={23} />
          <Dialog>
            <DialogTrigger>
              <Trash2
                strokeWidth={1.3}
                size={23}
                className="cursor-pointer text-red-900 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Êtes-vous vraiment certain ?</DialogTitle>
                <DialogDescription>Cette action est définitive, il n'y a pas de retour en arrière possible.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={() => handleDeletePassword()} disabled={isDeleting}>
                  Confirmer la suppression
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
