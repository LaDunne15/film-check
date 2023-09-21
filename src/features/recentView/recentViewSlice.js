import { createSlice } from '@reduxjs/toolkit'
import { localStorageService } from '../../services/localStorageService'

export const counterSlice = createSlice({
  name: 'recentViews',
  initialState: {
    value: localStorageService.getTitles(),
  },
  reducers: {
    addTitle: (state, action) => {
      state.value = localStorageService.addTitle(action.payload);
    },
    clearTitles: (state) => {
      state.value = localStorageService.clearTitles();
    }
  },
})
export const { addTitle, clearTitles } = counterSlice.actions

export default counterSlice.reducer