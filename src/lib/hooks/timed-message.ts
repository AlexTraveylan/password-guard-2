import { useEffect, useRef, useState } from "react"

export const useTimedMessage = (): [message: string | undefined, pushMessage: (message: string) => void] => {
  const [message, setMessage] = useState<string | undefined>()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const pushMessage = (message: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setMessage(message)

    timeoutRef.current = setTimeout(() => {
      setMessage(undefined)
    }, 5000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [message, pushMessage]
}
