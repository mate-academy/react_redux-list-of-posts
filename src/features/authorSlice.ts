/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },

    removeUser: (state) => {
      state.author = null;
    },
  },
});

export const {
  setAuthor,
  removeUser,
} = authorSlice.actions;

export default authorSlice.reducer;
