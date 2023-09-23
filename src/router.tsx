import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { SignIn, SignUp } from '@/components/auth'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Decks, Layout, PageNotFound } from '@/pages'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn />,
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
    element: <div>Check email</div>,
  },
  {
    path: '/create-new-password',
    element: <div>Create new password</div>,
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
    element: <div>Personal info</div>,
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
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true
  //если авторизован отобрази детей на месте outlet, иначе логин
  //в outlet рендерится все, что передаем в children, здесь это children: privateRoutes, можем внуть переджать массив

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
