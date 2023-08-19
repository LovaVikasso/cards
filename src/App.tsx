import { Button } from './components/ui'

export function App() {
  return (
    <div>
      Hello world
      <Button variant="primary" as={'button'}>
        Button
      </Button>
      <Button variant="primary" as={'a'} href="https://www.google.ru/">
        href
      </Button>
    </div>
  )
}
