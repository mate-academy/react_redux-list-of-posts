/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    setAuthorEmpty: (state) => {
      state.author = null;
    },
  },
});

export const { setAuthor, setAuthorEmpty } = authorSlice.actions;
export default authorSlice.reducer;
