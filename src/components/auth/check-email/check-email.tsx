import s from './check-email.module.scss'

import { Letter } from '@/assets/icons/letter.tsx'
import { Button, Typography } from '@/components/ui'
import { Card } from '@/components/ui/card'

export const CheckEmail = () => {
  return (
    <Card className={s.container}>
      <Typography variant="h1">Check Email</Typography>
      <Letter />
      <Typography className={s.text}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button variant={'primary'}>Back to Sign In</Button>
    </Card>
  )
}
