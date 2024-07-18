/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice: Slice<AuthorState> = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
