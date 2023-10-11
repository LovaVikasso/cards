import { baseApi } from '@/services/base-api.ts'
import { DecksParams, DecksResponse } from '@/services/decks/types.ts'

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
      createDeck: builder.mutation<any, { name: string }>({
        query: ({ name }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name },
        }),
        invalidatesTags: ['Decks'], //проверяем совпали ли данные которые были в кэше, то есть после post будут снова get
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = decksApi
//из baseApi вытаскиваем хуки, которые use_название эндпоинта_вид запросы ( query или mutation)
//use...query выоняются в момент вмонтирования компоненты
