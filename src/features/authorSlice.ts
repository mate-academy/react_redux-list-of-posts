/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorSliceState {
  author: User | null;
}

const initialState: AuthorSliceState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    removeAuthor: (state) => {
      state.author = null;
    },
  },
});

export const { setAuthor, removeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
