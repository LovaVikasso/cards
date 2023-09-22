import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Header } from '@/components/ui'

export const ForgotPasswordPage = () => {
  return (
    <div>
      <Header isAuth={true} onSignIn={() => {}} />
      <ForgotPassword />
    </div>
  )
}
