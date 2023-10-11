import { LoginArgs, LoginResponse } from './auth.types.ts'

import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<any, void>({
        //тут часть кода чтобы предотвратить беспонечные
        //me запросы, взято откуда-то с гита
        async queryFn(_name, _api, _extraOptions, baseQuery) {
          const result = await baseQuery({
            url: `v1/auth/me`,
            method: 'GET',
          })

          if (result.error) {
            // если нам пришла ошибка, мы все равно присваиваем
            // ее data, кэшируем так как потом data используем для
            // вычисления isAuthorised для редиректа (стр логинизации)
            // if (me && me?.success !== false) return <Navigate to={'/'} />
            // там если success == false то останемся на логине
            return { data: { success: false } }
          }

          //ну а если нету ошибки, присваиваем данные result.data
          // главное чтобы не было success:false
          return { data: result.data }
        },
        //чтобы при поулчении ошибки опять не отправлялся запрос
        //так избегются бесконечные запросы
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
      }),
      login: builder.mutation<LoginResponse, LoginArgs>({
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

export const { useLoginMutation, useGetMeQuery } = authApi
