import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { Button, Typography } from '@/components/ui'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled'
const schema = z.object({
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
  //нужен только адрес почты правльного формата
})

type FormValues = z.infer<typeof schema> //типизируем данные из схемы
export const CreateNewPassword = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.container}>
      <Typography variant="h1">Create new password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          name={'password'}
          control={control}
          label={'Password'}
          type={'password'}
        />

        <Typography className={s.text}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type="submit" variant={'primary'} fullWidth={true}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
