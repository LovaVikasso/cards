import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button, Typography } from '@/components/ui'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled'

const schema = z.object({
  email: z.string().email('Invalid email address').trim().nonempty('Enter email'), //мыло должно быть формата строка, типа почта(а@a@), убрать пробелы, не пустой
  //нужен только адрес почты правльного формата
})

type FormValues = z.infer<typeof schema> //типизируем данные из схемы
export const ForgotPassword = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.container}>
      <Typography variant="h1">Forgot your password?</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'email'}
          control={control}
          label={'Email'}
          placeholder={'example@mail.com'}
        />
        <Typography className={s.light} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth={true} type="submit">
          Send Instructions
        </Button>
      </form>
      <Typography variant={'body2'}>Did you remember your password?</Typography>
      <Button variant={'link'} as={Link} to="/login">
        Try logging in
      </Button>
    </Card>
  )
}
