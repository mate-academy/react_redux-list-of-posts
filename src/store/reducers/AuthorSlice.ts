/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

interface AuthorSliceState {
  author: User | null,
}

const initialState: AuthorSliceState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
