import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = null | User;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as Author,
  reducers: {
    setAuthor: (_state, action) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
