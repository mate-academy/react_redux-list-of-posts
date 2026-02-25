/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
