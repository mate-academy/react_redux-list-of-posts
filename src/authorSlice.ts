import { createSlice } from '@reduxjs/toolkit';

const authorSlice = createSlice({
  name: 'author',
  initialState: 'unknown author',
  reducers: {
    setAuthor: (_state, action) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
