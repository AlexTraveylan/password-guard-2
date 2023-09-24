import { Card } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Dispatch, SetStateAction } from "react"
import { PlusCircleIcon } from "../../node_modules/lucide-react"

export function PlusPasswordCard({ setIsShow }: { setIsShow: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Card className="w-[255px] h-[240px] flex items-center justify-center">
      <HoverCard closeDelay={0.1}>
        <HoverCardTrigger>
          <PlusCircleIcon size={35} strokeWidth={1.3} onClick={() => setIsShow(true)} className="cursor-pointer" />
        </HoverCardTrigger>
        <HoverCardContent>Montrer le formulaire d'ajout.</HoverCardContent>
      </HoverCard>
    </Card>
  )
}
