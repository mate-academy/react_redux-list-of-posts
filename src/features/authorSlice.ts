/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
    set: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
