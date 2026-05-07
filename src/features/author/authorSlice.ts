/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/User';

const initialState: User | null = null;

const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as User | null,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;
