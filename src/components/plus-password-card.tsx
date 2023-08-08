import { PlusCircleIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { Card } from "./ui/card"

export function PlusPasswordCard({ setIsShow }: { setIsShow: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Card className="w-[240px] h-[240px] flex items-center justify-center">
      <PlusCircleIcon size={35} strokeWidth={1.3} onClick={() => setIsShow(true)} className="cursor-pointer" />
    </Card>
  )
}
