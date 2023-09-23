import { ComponentPropsWithoutRef } from "react"

export type apiIsUserResponse = {
  action: "1" | "2"
}

export type PassBdd = {
  id: number
  title: string
  login: string
  password: string
}

export type encryptData = {
  iv: string
  encryptedPassword: string
}

export type InputProps = ComponentPropsWithoutRef<"input"> & { label: string }
