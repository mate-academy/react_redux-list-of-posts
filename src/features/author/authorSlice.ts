/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
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
