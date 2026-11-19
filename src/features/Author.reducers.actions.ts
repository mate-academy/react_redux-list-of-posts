import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

/* eslint-disable no-param-reassign */

export interface AuthorState {
  author: User | null;
  selectedUser: User | null;
}

const initialState: AuthorState = {
  selectedUser: null,
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
