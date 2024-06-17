import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
/* eslint-disable no-param-reassign */

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor(_, action: PayloadAction<User | null>) {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
