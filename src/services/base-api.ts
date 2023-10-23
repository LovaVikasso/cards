import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/base-query-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me', 'Cards'],
  baseQuery: baseQueryWithReauth, //все запросы будут проходить через него для токенов
  endpoints: () => ({}),
})
