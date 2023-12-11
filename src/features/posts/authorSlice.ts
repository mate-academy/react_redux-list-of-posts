/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/User';

import { getUser } from '../../api/users';

export type AuthorState = {
  author: User | null
};

const initState: AuthorState = {
  author: null,
};

export const getAuthorAsync = createAsyncThunk(
  'author/getAuthor',
  async (id: number) => {
    const author = await getUser(id);

    return author;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState: initState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthorAsync.fulfilled, (state, action) => {
      [state.author] = action.payload;
    });
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
