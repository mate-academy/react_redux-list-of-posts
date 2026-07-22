/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type Author = User | null;

const initialState = {
  currentAuthor: <Author>null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<Author>) => {
      state.currentAuthor = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { selectAuthor } = authorSlice.actions;
