import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    <Card>
      <Typography variant="h1">Forgot your password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField name={'email'} control={control} label={'Email'} />
        <Typography>Enter your email address and we will send you further instructions</Typography>
        <Button type="submit">Send Instructions</Button>
      </form>
      <Typography>Did ypu remember your password?</Typography>
      <Button variant={'link'} as={'a'}>
        Try logging in
      </Button>
    </Card>
  )
}
