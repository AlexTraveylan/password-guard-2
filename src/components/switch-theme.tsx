"use client"

import { useTheme } from "next-themes"

import { useState } from "react"
import { Moon, Sun } from "../../node_modules/lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

export function SwitchToggle() {
  const { systemTheme, setTheme } = useTheme()
  const [actualTheme, setActualTheme] = useState<"dark" | "light">(systemTheme ? systemTheme : "light")

  function toogleActualTheme() {
    if (actualTheme == "dark") {
      setActualTheme("light")
      setTheme("light")
    } else {
      setActualTheme("dark")
      setTheme("dark")
    }
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <HoverCard closeDelay={0.1}>
          <HoverCardTrigger>
            <div className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium" onClick={toogleActualTheme}>
              <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-slate-400" />
              <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-slate-400" />
            </div>
          </HoverCardTrigger>
          <HoverCardContent>Changer light/dark mode.</HoverCardContent>
        </HoverCard>
      </div>
    </>
  )
}
