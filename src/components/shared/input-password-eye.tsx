import { useState } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { Eye, EyeOff } from "../../../node_modules/lucide-react"
import { Input } from "../ui/input"

export function InputEye({
  field,
}: {
  field: ControllerRenderProps<
    {
      password: string
    },
    "password"
  >
}) {
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={isShowPassword ? "text" : "password"} {...field} className="pr-10" />
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointers" onClick={() => setIsShowPassword(!isShowPassword)}>
        {isShowPassword ? <Eye strokeWidth={1.3} size={23} /> : <EyeOff strokeWidth={1.3} size={23} />}
      </span>
    </div>
  )
}
