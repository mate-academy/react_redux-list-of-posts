/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      if (state) {
        Object.assign(state, action.payload);
      }
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
