import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button, Typography } from '@/components/ui'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import { useLoginMutation } from '@/services/auth/auth.ts'

const schema = z.object({
  email: z.string().email('Invalid email address').trim().nonempty('Enter email'), //мыло должно быть формата строка, типа почта(а@a@), убрать пробелы, не пустой
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
  rememberMe: z.boolean().optional(), //если не будет optional, то всегда надо нажимать галочку, а это не надо
})

type SignInFormType = z.infer<typeof schema> //типизируем данные из схемы

// export type SignInProps = {
//   onSubmit: (data: SignInFormType) => void //при сабмите отправляем данные типа мыло, пароль, запомниМеня
// }

export const SignIn = () => {
  const [login, { error }] = useLoginMutation()
  const { handleSubmit, control, setError } = useForm<SignInFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  if (error) {
    if (
      'status' in error &&
      typeof error.data == 'object' &&
      error.data &&
      'message' in error.data
    ) {
      setError('password', {
        type: 'custom',
        message: error.data.message as string,
      }) //
    }
  }
  const handleFormSubmitted = handleSubmit(login)

  return (
    <Card>
      <Typography variant="h1">Sign in</Typography>
      <form onSubmit={handleFormSubmitted}>
        <ControlledTextField name={'email'} control={control} label={'Email'} />
        <ControlledTextField
          name={'password'}
          control={control}
          label={'Password'}
          type={'password'}
        />
        <ControlledCheckbox name={'rememberMe'} control={control} label={'Remember Me'} />
        <Button type="submit">Sign in</Button>
      </form>
      <Typography>Forgot password?</Typography>
      <Typography>{`Don't have an account?`}</Typography>
      <Typography variant="link1" as={Link} to="/sign-up">
        Sign Up
      </Typography>
    </Card>
  )
}
