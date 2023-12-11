/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

type AuthorState = {
  author: User | null,
};

const initialState: AuthorState = {
  author: null,
};

export const fetchAuthor = createAsyncThunk('author/fetch', (id: number) => {
  return getUser(id);
});

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
