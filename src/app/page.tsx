import { GeneratePasswordCard } from "@/components/generate-password-card"
import { SignInUp } from "@/components/signin_signup"

export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-5">
      <SignInUp />
      <GeneratePasswordCard />
    </div>
  )
}
