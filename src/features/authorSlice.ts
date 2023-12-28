/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { User } from '../types/User';

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
    set: (state: AuthorState, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;
export default authorSlice.reducer;
