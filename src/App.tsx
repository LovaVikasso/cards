import { Button, Typography } from './components/ui'

export function App() {
  return (
    <div>
      <Button variant="primary" as={'button'}>
        Button
      </Button>
      <Button variant="primary" as={'a'} href="https://www.google.ru/">
        href
      </Button>
      <Typography>Помойка это моя, я хозяин помойки</Typography>
    </div>
  )
}
