import { Provider } from 'react-redux'

// import { Decks } from '@/pages/decks/decks.tsx'
// import { Layout } from '@/pages/layout'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      {/*<Layout />*/}
      {/*<Decks />*/}
      <Router />
    </Provider>
  )
}
