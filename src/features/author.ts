/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  user: User | null;
}

const initialState: AuthorState = {
  user: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuthor: state => {
      state.user = null;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor, clearAuthor } = authorSlice.actions;
