import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Typography } from '@/components/ui'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled'

const schema = z
  .object({
    email: z.string().email('Invalid email address').trim().nonempty('Enter email'), //мыло должно быть формата строка, типа почта(а@a@), убрать пробелы, не пустой
    password: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
    confirm: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа, //если не будет optional, то всегда надо нажимать галочку, а это не надо
  })
  .refine(data => data.password === data.confirm, {
    message: 'The password did not match', //доп проверка чтобы пароли совпадали
    path: ['confirm'], //если будет ошибка то вывести в поле confirm
  })

type FormValues = z.infer<typeof schema> //типизируем данные из схемы
export const SignUp = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card>
      <Typography variant="h1">Sign up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField name={'email'} control={control} label={'Email'} />
        <ControlledTextField name={'password'} control={control} label={'Password'} />
        <ControlledTextField name={'confirm'} control={control} label={'Confirm password'} />
        <Button type="submit">Sign up</Button>
      </form>
      <Typography>Already have an account?</Typography>
      <Button variant={'link'} as={'a'}>
        Sign In
      </Button>
    </Card>
  )
}
