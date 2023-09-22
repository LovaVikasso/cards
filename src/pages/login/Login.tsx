import { SignIn } from '@/components/auth'
import { useLoginMutation } from '@/services/auth/auth.ts'

export const Login = () => {
  const [login, error] = useLoginMutation()

  console.log(error)

  return <SignIn onSubmit={login} />
}
