import { Input } from "@/components/ui/input"
import styles from "@/styles/password-input.module.css"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card"
import { ComponentPropsWithoutRef, useState } from "react"
import { Eye, EyeOff } from "../../../node_modules/lucide-react"

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string
  validate?: (password: string) => boolean
  validationMessage?: string
}

export function PasswordInput({ label, validate, validationMessage, ...props }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isValid, setIsValid] = useState(true)

  function validatePassword(password: string) {
    if (validate) {
      const isValidated = validate(password)
      setIsValid(isValidated)
    }
  }

  return (
    <div className="mb-3 max-w-xs flex flex-col gap-1 items-center">
      <label htmlFor="default-input" className="block text-sm">
        {label}
      </label>
      <div className="inline-flex items-center gap-3">
        <Input
          id="default-input"
          className={`border text-base rounded-lg block px-3 py-1 ${!isValid && styles.notValid}`}
          type={isPasswordVisible ? "text" : "password"}
          onChange={(e) => {
            validatePassword(e.target.value)
          }}
          {...props}
        />
        <HoverCard closeDelay={0.1}>
          <HoverCardTrigger>
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? (
                <Eye size={40} strokeWidth={1.3} className="hover:bg-slate-100 hover:dark:bg-slate-800 p-2 rounded-[50%]" />
              ) : (
                <EyeOff size={40} strokeWidth={1.3} className="hover:bg-slate-100 hover:dark:bg-slate-800 p-2 rounded-[50%]" />
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent>Cacher/voir le mot de passe</HoverCardContent>
        </HoverCard>
      </div>
      {!isValid && (
        <p className="text-red-500 text-sm mt-1 text-center">
          {validationMessage != undefined ? <>{validationMessage}</> : <>Champ non valide</>}
        </p>
      )}
    </div>
  )
}
