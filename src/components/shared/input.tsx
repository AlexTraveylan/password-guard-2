import { InputProps } from "@/lib/types/types"

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-3">
      <label htmlFor="default-input" className="block mb-2 text-sm">
        {label}
      </label>
      <input id="default-input" className="border rounded-lg block px-3 py-1" {...props} />
    </div>
  )
}
