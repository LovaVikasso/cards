import { useState } from 'react'

import s from './decks.module.scss'

import { Button, Table, Typography } from '@/components/ui'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { Column, Sort } from '@/services/types'
const columns: Column[] = [
  { key: 'Name', title: 'Name', sortable: true },
  { key: 'Cards', title: 'Cards', sortable: true },
  { key: 'Last Updated', title: 'Last Updated', sortable: true },
  { key: 'Created by', title: 'Created by' },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>(null)
  const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null

  console.log(sort, sortString)
  const [search, setSearch] = useState('')
  const decks = useGetDecksQuery({
    name: search,
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  // console.log(decks)

  return (
    <div className={s.container}>
      <Typography variant={'h2'}>Packs list</Typography>
      <div className={s.menu}>
        <TextField
          className={s.search}
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder="Search by name"
        />
        <Button>My cards</Button>
        <Button>All cards</Button>
        <Button
          onClick={() => {
            createDeck({ name: 'Еще новее' })
          }}
          disabled={isLoading}
        >
          Add New Pack
        </Button>
      </div>
      <Table.Root>
        <Table.SortedHeader columns={columns} sort={sort} onSort={setSort} />
        {/*<Table.Row>*/}
        {/*  <Table.HeadData>Name</Table.HeadData>*/}
        {/*  <Table.HeadData>Cards</Table.HeadData>*/}
        {/*  <Table.HeadData>Last Updated</Table.HeadData>*/}
        {/*  <Table.HeadData>Created by</Table.HeadData>*/}
        {/*</Table.Row>*/}
        <Table.Body>
          {decks.data?.items?.map((deck: any) => {
            return (
              <Table.Row key={deck.id}>
                <Table.Data>{deck.name}</Table.Data>
                <Table.Data>{deck.cardsCount}</Table.Data>
                <Table.Data>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                <Table.Data>{deck.author.name}</Table.Data>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
