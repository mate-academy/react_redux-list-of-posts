/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/User';

import { getUser } from '../../api/users';

export interface AuthorState {
  author: User | null
}

const initialStateOfAuthor: AuthorState = {
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
  initialState: initialStateOfAuthor,
  reducers: {
    setNewAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthorAsync.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export const { setNewAuthor } = authorSlice.actions;
export default authorSlice.reducer;
