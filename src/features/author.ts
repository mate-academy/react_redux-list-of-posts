/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null;
}
const initialState: AuthorState = {
  author: null,
};

export const authorSlise = createSlice({
  name: 'author',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { add } = authorSlise.actions;

export default authorSlise.reducer;
