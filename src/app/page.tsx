import { GeneratePasswordCard } from "@/components/generate-password-card"
import { PwnedPassword } from "@/components/pwned-password"
import SandBoxCard from "@/components/sandbox-card"
import { SignInUp } from "@/components/signin_signup"
import { currentUser } from "@/lib/hooks/auth"

export default async function Home() {
  const { email } = currentUser()

  return (
    <div className="flex flex-col items-center gap-5">
      <SignInUp />
      <GeneratePasswordCard />
      <PwnedPassword />
      {email && <SandBoxCard />}
    </div>
  )
}
