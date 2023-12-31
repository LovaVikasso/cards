import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    itemsPerPage: 10,
  },
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
})
