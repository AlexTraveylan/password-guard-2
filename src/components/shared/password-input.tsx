import styles from "@/components/styles/password-input.module.css"
import { Input } from "@/components/ui/input"
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

  function togglePasswordVisibility(visible: boolean) {
    setIsPasswordVisible(visible)
  }

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
          className={`border rounded-lg block px-3 py-1 ${!isValid && styles.notValid}`}
          type={isPasswordVisible ? "text" : "password"}
          onChange={(e) => {
            validatePassword(e.target.value)
          }}
          {...props}
        />
        <div
          onMouseDown={() => togglePasswordVisibility(true)}
          onMouseUp={() => togglePasswordVisibility(false)}
          onMouseLeave={() => togglePasswordVisibility(false)}
        >
          {isPasswordVisible ? <Eye /> : <EyeOff />}
        </div>
      </div>
      {!isValid && (
        <p className="text-red-500 text-sm mt-1 text-center">
          {validationMessage != undefined ? <>{validationMessage}</> : <>Champ non valide</>}
        </p>
      )}
    </div>
  )
}
