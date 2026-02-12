/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type InitialType = {
  author: User | null;
};

const initialState: InitialType = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { selectAuthor } = authorSlice.actions;
