"use client"

import { AddPasswordForm2 } from "@/components/forms/add-password-form-2"
import { PasswordCard } from "@/components/password_card"
import { PlusPasswordCard } from "@/components/plus-password-card"
import AccessDenied from "@/components/shared/access-denied"
import { Loader } from "@/components/shared/loader"
import { PassBdd, encryptData } from "@/components/types/types"
import { decryptPassword, privateKeyDecrypt } from "@/services/security.service"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export default function ProtectedPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [isAcces, setIsAcces] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [passwords, setPasswords] = useState<PassBdd[]>([])

  async function checkIsUserLogged() {
    const response = await fetch("api/user")
    if (response.ok) {
      setIsAcces(true)
      recupPasswords()
    }
    setIsLoading(false)
  }

  async function recupPasswords() {
    const privateKey = localStorage.getItem("privateKey")
    if (!privateKey) return
    const response = await fetch("api/passwords")
    if (!response.ok) return

    const data = await response.json()

    const privateKeyBuffer = Buffer.from(privateKey, "utf-8")

    const passBdds: PassBdd[] = []

    for (const password of data.passwords) {
      const encryptedData: encryptData = {
        iv: password.iv,
        encryptedPassword: Buffer.from(password.password, "hex").toString("hex"),
      }

      const decryptedAESKey = privateKeyDecrypt(Buffer.from(password.encryptedAESKey, "base64"), privateKeyBuffer)
      const decryptedPassword = decryptPassword(encryptedData, decryptedAESKey)

      passBdds.push({ id: password.id, title: password.title, login: password.login, password: decryptedPassword })
    }

    setPasswords(passBdds)
  }

  useEffect(() => {
    checkIsUserLogged()
  }, [])

  if (isLoading) {
    return <Loader show={true} />
  }

  if (!user || !isAcces) {
    return <AccessDenied />
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-3 flex-wrap justify-center my-5">
        {isAcces && passwords.length > 0 && (
          <>
            {passwords.map((password) => {
              return <PasswordCard password={password} recupPasswords={recupPasswords} />
            })}
          </>
        )}
        {isShow ? <AddPasswordForm2 recupPasswords={recupPasswords} setIsShow={setIsShow} /> : <PlusPasswordCard setIsShow={setIsShow} />}
      </div>
    </div>
  )
}
