import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Decks, Login } from '@/pages'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <div>Sign up</div>,
  },
  {
    path: '/forgot-password',
    element: <div>Forgot your password?</div>,
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
    element: <div>404 page not found</div>,
  },
] //есть публичные роуты, куда может зайти неавторизованный пользователь
//в виде массива объектов {путь и элемент (что отображаем)}

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/personal-info',
    element: <div>Personal info</div>,
  },
] //есть приватные, куда можно зайти только после успешной авторизации

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
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
