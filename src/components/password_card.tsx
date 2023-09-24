"use client"
import CopyToClipboardButton from "@/components/clipBoardButton"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { PassBdd } from "@/lib/types/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, PenBox, Trash2 } from "../../node_modules/lucide-react"
import { EditPassword } from "./forms/edit-password-form"
import { PasswordDetail } from "./password-details"
import { Button } from "./ui/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

export function PasswordCard({ password }: { password: PassBdd }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isShowDetail, setIsShowDetail] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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
      toast({
        description: "Suppression effectuée avec succès.",
      })
      router.refresh()
    } else {
      toast({
        variant: "destructive",
        description: "Echec de la suppression.",
      })
    }
    setIsDeleting(false)
  }

  if (isEditing) {
    return <EditPassword setIsEditing={setIsEditing} password={password} />
  }

  if (isShowDetail) {
    return <PasswordDetail password={password} setIsShowDetail={setIsShowDetail} />
  }

  return (
    <div key={password.id} className="relative">
      <Card className="w-[255px] h-[240px] flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{password.title}</CardTitle>
          <CardDescription className="flex flex-row justify-between">
            <div>Carte n°{password.id}</div>
            <div onClick={() => setIsShowDetail(true)}>
              <Eye className="cursor-pointer" strokeWidth={1.3} size={23} />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-center gap-3">
          <CopyToClipboardButton password={password.login} btnType="user" />
          <CopyToClipboardButton password={password.password} btnType="password" />
        </CardContent>
        <CardFooter className="flex flex-row justify-end gap-5">
          <div onClick={() => setIsEditing(true)}>
            <PenBox strokeWidth={1.3} size={23} className="cursor-pointer" />
          </div>
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
