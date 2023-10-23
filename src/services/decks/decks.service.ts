import { baseApi } from '@/services/base-api.ts'
import {
  Card,
  Deck,
  DeckRequestParams,
  DecksParams,
  DecksResponse,
  GetRandomCard,
  SaveTheGrade,
} from '@/services/decks/types.ts'
import { RootState } from '@/services/store.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, DecksParams>({
        //<1 - то, что возвращается, 2> - параметры что передаем в запрос
        query: params => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: params ?? {},
          }
        },
        providesTags: ['Decks'], //как отработается запрос, данные из него будут храниться под тегом для исключенпя дальнйших перерисовок
      }),
      getDeckById: builder.query<Deck, { id: string }>({
        query: ({ id }) => `/v1/decks/${id}`,
      }),
      createDeck: builder.mutation<Deck, { name: string }>({
        query: ({ name }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name },
        }),
        //onQueryStarted принимает в параметры все, что пришло в data, если он нам не нужен, то _
        //диспатчим наш сервис или апи,
        // первый параметр endpoint, не тег
        // второй паратетр аргументы, что передавались в query, поэтому такие данные надо хранить в редаксе
        // в endpoint пишем get, потому что после добавления поста нам надо получить все данные (колоды, вдрруг кто-то создал еще в процессе создания нашей)
        //то есть мы пессимистичны - будем делать get после post запроса
        async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          try {
            const response = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                { currentPage: state.decks.currentPage },
                draft => {
                  // draft.items.unshift(response.data)
                  draft.items = [response.data, ...draft.items]
                }
              )
            )
          } catch (error) {
            // patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'], //проверяем совпали ли данные которые были в кэше, то есть после post будут снова get
      }),
      deleteDeck: builder.mutation<void, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { currentPage: state.decks.currentPage },
              draft => {
                draft.items = draft.items.filter(item => item.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch (error) {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<Deck, DeckRequestParams>({
        query: updateData => ({
          url: `/v1/decks/${updateData.id}`,
          method: 'PATCH',
          body: {
            cover: updateData.cover,
            name: updateData.name,
            isPrivate: updateData.isPrivate,
          },
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          try {
            const response = await queryFulfilled

            dispatch(
              decksApi.util.updateQueryData(
                'getDecks',
                { currentPage: state.decks.currentPage },
                draft => {
                  draft.items = draft.items.map(item => (item.id === id ? item : response.data))
                }
              )
            )
          } catch (error) {
            //  patchResult.undo()
            alert(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getARandomCard: builder.query<Card, GetRandomCard>({
        query: ({ id, ...args }) => ({
          url: `/v1/decks/${id}/learn`,
          method: 'GET',
          params: { ...args },
        }),
        providesTags: ['Learn'],
      }),
      saveTheGrade: builder.mutation<Deck, { id: string; data: SaveTheGrade }>({
        query: ({ id, data }) => ({
          url: `v1/decks/${id}/learn`,
          method: 'POST',
          body: {
            cardId: data.cardId,
            grade: data.grade,
          },
        }),
        invalidatesTags: ['Learn'],
        //не проверяла работу, надо делать компоненты. При применении не забыть сделать валидацию от 1 до 5
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} = decksApi
//из baseApi вытаскиваем хуки, которые use_название эндпоинта_вид запросы ( query или mutation)
//use...query выоняются в момент вмонтирования компоненты
