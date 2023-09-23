"use client"

import { useState } from "react"
import { CheckPasswordForm } from "./forms/check-password-form"
import { MasterFormCreate } from "./forms/master-form-create"

export function SignInUp() {
  const [isSignIn, setIsSignIn] = useState(true)

  return <>{isSignIn ? <CheckPasswordForm setIsSignIn={setIsSignIn} /> : <MasterFormCreate setIsSignIn={setIsSignIn} />}</>
}
