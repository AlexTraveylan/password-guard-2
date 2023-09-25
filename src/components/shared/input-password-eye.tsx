"use client"

import { Input, InputProps } from "@/components/ui/input"
import React, { useState } from "react"
import { Eye, EyeOff } from "../../../node_modules/lucide-react"

export const InputEye = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={isShowPassword ? "text" : "password"} {...props} className="pr-10" ref={ref} />
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setIsShowPassword(!isShowPassword)}>
        {isShowPassword ? <Eye strokeWidth={1.3} size={23} /> : <EyeOff strokeWidth={1.3} size={23} />}
      </span>
    </div>
  )
})
