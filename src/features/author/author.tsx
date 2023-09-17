/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: { author: User | null } = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    addAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { addAuthor } = authorSlice.actions;
export default authorSlice.reducer;
