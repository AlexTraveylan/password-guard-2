import { ThemeToggle } from "@/components/ThemeToggle"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/Button"

export function NavBar() {
  return (
    <nav className="z-20 w-full border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link href="/">
          <Image className="cursor-pointer" src="/logo2.png" width={40} height={40} alt="Logo" />
        </Link>
        <div className="flex md:order-2">
          <div className="flex items-center gap-x-3 cursor-pointer">
            <ThemeToggle />
            <SignedIn>
              <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign in</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
}
