import { useState } from "react"

export const useError = (): [error: string, pushError: (message: string) => void] => {
  const [error, setError] = useState("")
  const pushError = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError("")
    }, 2000)
  }
  return [error, pushError]
}
