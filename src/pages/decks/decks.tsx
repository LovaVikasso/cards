import { useState } from 'react'

import s from './decks.module.scss'

import { useAppDispatch, useAppSelector } from '@/common/hooks.ts'
import { Button, Table, Typography, Modal, Pagination } from '@/components/ui'
import { TextField } from '@/components/ui/text-field'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/decks/types.ts'
import { Column, Sort } from '@/services/types'
const columns: Column[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'cardsCount', title: 'Cards', sortable: true },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'created', title: 'Created by' },
  { key: 'actions', title: '' },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда

  const currentPage = useAppSelector(state => state.decks.currentPage)
  const itemsPerPage = useAppSelector(state => state.decks.itemsPerPage)
  const dispatch = useAppDispatch()
  const updateCurrentPage = (page: number) => dispatch(decksSlice.actions.updateCurrentPage(page))
  const [openModal, setOpenModal] = useState(false)
  const [search, setSearch] = useState('')
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: search,
    orderBy: sortString,
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

  return (
    <div className={s.container}>
      <Button onClick={() => setOpenModal(true)}>Open modal</Button>
      <Modal
        open={openModal}
        onOpenChange={() => setOpenModal(true)}
        modalTitle={'Modal big title'}
      >
        <Typography>Hello</Typography>
        <Button>Press me</Button>
      </Modal>
      <Typography variant={'h2'}>Packs list</Typography>
      <div className={s.menu}>
        <TextField
          className={s.search}
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder="Search by name"
        />
        {/*<Tab value={activeTab} onValueChange={setActiveTab}>*/}
        {/*  <Tablist>*/}
        {/*    <TabTrigger value={'my'} >My decks</TabTrigger>*/}
        {/*    <TabTrigger value={'all'} >All decks</TabTrigger>*/}
        {/*  </Tablist>*/}
        {/*</Tab>*/}
        <Button>My cards</Button>
        <Button>All cards</Button>
        <Button
          onClick={() => {
            updateCurrentPage(1)
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
          {decks?.items?.map((deck: Deck) => {
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
      {decks?.pagination.totalItems && (
        <Pagination
          className={s.pagination}
          totalCount={decks?.pagination.totalItems}
          currentPage={currentPage}
          pageSize={itemsPerPage}
          onPageChange={updateCurrentPage}
        />
      )}
    </div>
  )
}
