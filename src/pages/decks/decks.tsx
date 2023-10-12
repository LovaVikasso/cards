import { useState } from 'react'

import s from './decks.module.scss'

import { Button, Table, Typography, Slider } from '@/components/ui'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { Deck } from '@/services/decks/types.ts'
import { Column, Sort } from '@/services/types'
const columns: Column[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'cardsCount', title: 'Cards', sortable: true },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'created', title: 'Created by' },
  { key: 'icons', title: '' },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда

  // console.log(sort, sortString)
  const [search, setSearch] = useState('')
  const decks = useGetDecksQuery({
    name: search,
    orderBy: sortString,
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  // console.log(decks)

  return (
    <div className={s.container}>
      <Slider />
      <Typography variant={'h2'}>Packs list</Typography>
      <div className={s.menu}>
        <TextField
          className={s.search}
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder="Search by name"
        />
        {/*<Tab value={activeTab} onVaaueChange={setActiveTab}>*/}
        {/*  <Tablist>*/}
        {/*    <TabTrigger value={'my'} >My decks</TabTrigger>*/}
        {/*    <TabTrigger value={'all'} >All decks</TabTrigger>*/}
        {/*  </Tablist>*/}
        {/*</Tab>*/}
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
        {/*</Table.Row> если без сортировки*/}
        <Table.Body>
          {decks.currentData?.items?.map((deck: Deck) => {
            return (
              <Table.Row key={deck.id}>
                <Table.Data>{deck.name}</Table.Data>
                <Table.Data>{deck.cardsCount}</Table.Data>
                <Table.Data>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                <Table.Data>{deck.author.name}</Table.Data>
                <Table.Data>
                  <Button
                    onClick={() =>
                      deleteDeck({ id: deck.id })
                        .unwrap()
                        .catch(error => alert(error?.data?.message))
                    }
                  >
                    Delete deck
                  </Button>
                </Table.Data>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
