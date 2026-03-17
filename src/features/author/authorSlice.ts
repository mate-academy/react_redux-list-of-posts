import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as number | null, 
  reducers: {
    setAuthor: (state, action: PayloadAction<number>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
