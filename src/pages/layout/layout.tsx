import { Header } from '@/components/ui'

export const Layout = () => {
  return (
    <div>
      <Header isAuth={true} onSignIn={() => {}} />
      {/*<Outlet />*/}
    </div>
  )
}
