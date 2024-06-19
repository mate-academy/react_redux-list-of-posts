import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: {} as User,
  reducers: {
    setAuthor: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
