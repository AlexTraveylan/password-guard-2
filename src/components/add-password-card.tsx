"use client"

import { useState } from "react"
import { AddPasswordForm } from "./forms/add-password-form"
import { PlusPasswordCard } from "./plus-password-card"

export function AddPasswordCard() {
  const [isShow, setIsShow] = useState(false)
  return <>{isShow ? <AddPasswordForm setIsShow={setIsShow} recupPasswords={undefined} /> : <PlusPasswordCard setIsShow={setIsShow} />}</>
}
