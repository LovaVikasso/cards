import { baseApi } from '@/services/base-api.ts'
import { UpdateCardParams } from '@/services/cards/types.ts'
import { Card, CardsResponse, CreateCardParams, GetCardsParams } from '@/services/decks/types.ts'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetCardsParams>({
        query: ({ id, ...params }) => ({
          url: `/v1/decks/${id}/cards`,
          params: params,
        }),
        providesTags: ['Cards'],
      }),
      getCardById: builder.query<Card, { id: string }>({
        query: ({ id }) => `/v1/cards/${id}`,
      }),
      createCard: builder.mutation<Card, { id: string; data: CreateCardParams }>({
        query: ({ id, data }) => ({
          url: `/v1/decks/${id}/cards`,
          method: 'POST',
          body: {
            question: data.question,
            answer: data.answer,
            questionImg: data.questionImg,
            answerImg: data.answerImg,
            questionVideo: data.questionVideo,
            answerVideo: data.answerVideo,
          },
        }),
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<Card, { id: string; data: UpdateCardParams }>({
        query: ({ id, data }) => ({
          url: `/v1/cards/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
  useGetCardByIdQuery,
  useCreateCardMutation,
} = cardsApi
