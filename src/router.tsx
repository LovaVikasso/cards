import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignUp, ForgotPassword, CheckEmail } from '@/components/auth'
import { CreateNewPassword } from '@/components/auth/create-new-password'
import { PersonalInfo } from '@/components/personal'
import { Typography } from '@/components/ui'
import { Decks, Layout, Login, PageNotFound } from '@/pages'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/check-email',
    element: <CheckEmail />,
  },
  {
    path: '/create-new-password',
    element: <CreateNewPassword />,
  },
  {
    path: '/*',
    element: <PageNotFound />,
  },
] //есть публичные роуты, куда может зайти неавторизованный пользователь
//в виде массива объектов {путь и элемент (что отображаем)}

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/info',
    element: <PersonalInfo name={'Victoria'} avatar={'VP'} email={'victoria.pavlova7@gmail.com'} />,
  },
] //есть приватные, куда можно зайти только после успешной авторизации

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
    ],
  },
  {
    element: <Layout />,
    children: publicRoutes,
  },
]) //создаем роуты через createBrowserRouter, в него передаем массив публичных и приватных роутов раскукоженными

export const Router = () => {
  const { isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <Typography variant={'h1'}>Loading</Typography>

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data: me } = useGetMeQuery()
  const isAuthenticated = me && me?.success !== false

  //если авторизован отобрази детей на месте outlet, иначе логин
  //в outlet рендерится все, что передаем в children, здесь это children: privateRoutes, можем внуть переджать массив

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
