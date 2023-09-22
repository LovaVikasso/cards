import { SignIn } from '@/components/auth'
import { Header } from '@/components/ui'

export const SignInPage = () => {
  return (
    <div>
      <Header isAuth={true} onSignIn={() => {}} />
      <SignIn />
    </div>
  )
}
