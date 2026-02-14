/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState = null as User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(_state, action: PayloadAction<User>) {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
