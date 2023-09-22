import { useState } from 'react'

import { Button } from '@/components/ui'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'

export const Decks = () => {
  const [search, setSearch] = useState('')
  const decks = useGetDecksQuery({
    name: search,
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  console.log(decks)

  return (
    <div>
      <TextField
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        label={'Search by name'}
      />
      <Button
        onClick={() => {
          createDeck({ name: 'Очень новая' })
        }}
        disabled={isLoading}
      >
        create Deck
      </Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created by</th>
          </tr>
        </thead>
        <tbody>
          {decks.data?.items?.map((deck: any) => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
