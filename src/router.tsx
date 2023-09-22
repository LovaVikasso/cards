import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
] //есть публичные роуты, куда может зайти неавторизованный пользователь
//в виде массива объектов {путь и элемент (что отображаем)}

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <div>hello</div>,
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