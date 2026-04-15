// src/app/slices/authorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authorSlice = createSlice({
  name: 'author',
  initialState: { id: null as number | null },
  reducers: {
    setAuthor: (state, action: PayloadAction<number | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
