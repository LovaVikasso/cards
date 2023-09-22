import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Typography } from '@/components/ui'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'

const schema = z.object({
  email: z.string().email('Invalid email address').trim().nonempty('Enter email'), //мыло должно быть формата строка, типа почта(а@a@), убрать пробелы, не пустой
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
  rememberMe: z.boolean().optional(), //если не будет optional, то всегда надо нажимать галочку, а это не надо
})

type FormValues = z.infer<typeof schema> //типизируем данные из схемы
export const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  console.log(errors)
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant="h1">Sign in</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField name={'email'} control={control} label={'Email'} />
        <ControlledTextField name={'password'} control={control} label={'Password'} />
        <ControlledCheckbox name={'rememberMe'} control={control} label={'Remember Me'} />
        <Button type="submit">Sign in</Button>
      </form>
      <Typography>Forgot password?</Typography>
      <Typography>{`Don't have an account?`}</Typography>
      <Button variant={'link'} as={'a'}>
        Sign Up
      </Button>
    </Card>
  )
}
