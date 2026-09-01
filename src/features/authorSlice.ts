import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: {
    author: null as User | null,
  },
  reducers: {
    setAuthor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
