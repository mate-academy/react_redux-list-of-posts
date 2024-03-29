/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface Author {
  author: User | null;
}

const initialState: Author = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    clear: state => {
      state.author = null;
    },
  },
});

export const { set, clear } = authorSlice.actions;
export default authorSlice.reducer;
