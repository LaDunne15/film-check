import { configureStore } from '@reduxjs/toolkit';
import recentViews from "../features/recentView/recentViewSlice"

export default configureStore({
  reducer: {
    recentViews
  },
})