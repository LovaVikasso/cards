import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<any, { email: string; password: string }>({
        //<1 - то, что возвращается, 2> - параметры что передаем в запрос
        query: params => {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: params,
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const { useLoginMutation } = authApi
