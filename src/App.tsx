// import { ForgotPasswordPage } from '@/pages'

// import { Layout } from '@/pages/layout'
import { Provider } from 'react-redux'

// import { Router } from '@/router.tsx'
import { Decks } from '@/pages/decks.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Decks />
      {/*       */}
    </Provider>
  )
}
