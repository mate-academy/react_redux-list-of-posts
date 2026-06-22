// features/author/authorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as number | null,
  reducers: {
    setAuthor: (_state, action: PayloadAction<number | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
