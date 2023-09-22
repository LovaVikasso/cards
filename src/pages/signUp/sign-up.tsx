import { SignUp } from '@/components/auth'
import { Header } from '@/components/ui'

export const SignUpPage = () => {
  return (
    <div>
      <Header isAuth={true} onSignIn={() => {}} />
      <SignUp />
    </div>
  )
}
