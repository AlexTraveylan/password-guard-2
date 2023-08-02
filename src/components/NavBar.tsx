"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 left-0 z-20 w-full bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link href={"/"}>
          <Image className={"cursor-pointer"} src="/logo.svg" width={124} height={124} alt="Your logo" />
        </Link>
        <div className="flex md:order-2">
          <div className={"flex items-center gap-x-1 cursor-pointer"}>
            <ThemeToggle />
            <SignedIn>
              <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex h-10 p-4 items-center border rounded-[3px] bg-indigo-600 text-white font-medium">Sign in</button>
              </SignInButton>
            </SignedOut>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`items-center justify-between ${isOpen ? "flex" : "hidden"} md:flex w-full md:w-auto md:order-1`} id="navbar-sticky">
          <ul className="flex flex-col w-full p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {[
              ["Home", "/"],
              ["Pricing", "/pricing"],
              ["Dashboard", "/Dashboard"],
              ["Articles", "/crud"],
            ].map(([title, url]) => (
              <Link
                key={uuidv4()}
                href={url}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded active:text-white active:md:text-blue-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                {title}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
