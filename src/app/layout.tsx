import { NavBar } from "@/components/NavBar"
import { Providers } from "@/components/Providers"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Password Guard",
  description: "Protect all your password with only one master password",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <Providers>
        <body
          className={cn(
            "font-sans min-h-screen flex flex-col dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black",
            inter.className
          )}
        >
          <NavBar />
          <main className="flex-grow flex items-center justify-center p-5">{children}</main>
          <Toaster />
          <Footer />
        </body>
      </Providers>
    </html>
  )
}
