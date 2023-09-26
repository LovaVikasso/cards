import { FC } from 'react'

import s from './personal-info.module.scss'

import { Edit } from '@/assets/icons/edit.tsx'
import { Exit } from '@/assets/icons/exit.tsx'
import { Button, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
type PersonalInfoProps = {
  name: string
  avatar: string
  email: string
}
export const PersonalInfo: FC<PersonalInfoProps> = ({ name, avatar, email }) => {
  return (
    <Card className={s.container}>
      <Typography variant="h1">Personal Info</Typography>
      <Avatar avatar={avatar} name={name} className={s.avatar} />
      <Button variant={'secondary'} className={s.iconButton}>
        <Edit />
      </Button>
      <div className={s.name}>
        <Typography variant="h2">{name}</Typography> <Edit />
      </div>
      <Typography className={s.text}>{email}</Typography>
      <Button variant={'secondary'}>
        <Exit />
        Logout
      </Button>
    </Card>
  )
}
