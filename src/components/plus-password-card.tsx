import { Card } from "@/components/ui/card"
import { Dispatch, SetStateAction } from "react"
import { PlusCircleIcon } from "../../node_modules/lucide-react"

export function PlusPasswordCard({ setIsShow }: { setIsShow: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Card className="w-[255px] h-[240px] flex items-center justify-center">
      <PlusCircleIcon size={35} strokeWidth={1.3} onClick={() => setIsShow(true)} className="cursor-pointer" />
    </Card>
  )
}
