import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

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

export type SignUpFormType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type FormType = Omit<SignUpFormType, 'confirm'>
export type SignUpProps = {
  // value?: string
  // onInputValueChange?: (value: string) => void
  onSubmit: (data: FormType) => void //при сабмите отправляем данные типа мыло, пароль, подтверждение пароля
}
export const SignUp = (props: SignUpProps) => {
  const { handleSubmit, control } = useForm<SignUpFormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })
  const handleFormSubmitted = handleSubmit(data => {
    const { confirm, ...rest } = data

    props.onSubmit(rest)
  })

  return (
    <Card className={s.container}>
      <Typography variant="h1">Sign up</Typography>
      <form className={s.form} onSubmit={handleFormSubmitted}>
        <ControlledTextField name={'email'} control={control} label={'Email'} />
        <ControlledTextField
          name={'password'}
          control={control}
          label={'Password'}
          type={'password'}
        />
        <ControlledTextField
          name={'confirm'}
          control={control}
          label={'Confirm password'}
          type={'password'}
        />
        <Button className={s.button} type="submit">
          Sign up
        </Button>
      </form>
      <Typography>Already have an account?</Typography>
      <Button variant={'link'} as={Link} to="/login">
        Sign In
      </Button>
    </Card>
  )
}
