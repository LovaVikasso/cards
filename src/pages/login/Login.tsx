import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth'
import { Typography } from '@/components/ui'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

export const Login = () => {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <Typography variant="h1">Loading...</Typography>
  if (me && me?.success !== false) return <Navigate to={'/'} />

  return <SignIn />
}
