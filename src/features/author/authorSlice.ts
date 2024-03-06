import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
/* eslint-disable no-param-reassign */

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    removeAuthor: state => {
      state.author = null;
    },
  },
});

export const { setAuthor, removeAuthor } = authorSlice.actions;
export default authorSlice.reducer;
