"use client"

import { ThemeProvider } from "next-themes"
import React from "react"

type ProvidersProps = {
  children: React.ReactNode
}
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
