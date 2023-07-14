/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null,
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    clearAuthor: (state: AuthorState) => {
      state.author = null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
