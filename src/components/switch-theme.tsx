"use client"

import { useTheme } from "next-themes"

import { useState } from "react"
import { Moon, Sun } from "../../node_modules/lucide-react"
import { Switch } from "./ui/switch"

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
        <Switch id="airplane-mode" onCheckedChange={toogleActualTheme} />
        <div className="inline-flex items-center justify-center rounded-md text-sm font-medium">
          <Sun className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100" />
          <Moon className="absolute rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </div>
    </>
  )
}
