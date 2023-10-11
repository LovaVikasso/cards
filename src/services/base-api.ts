import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/base-query-with-reauth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Me'],
  baseQuery: baseQueryWithReauth, //все апосы будут проходить через него для токенов
  endpoints: () => ({}),
})
