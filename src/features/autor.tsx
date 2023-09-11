/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const init = createAsyncThunk('author/getAuthor', async (id: number) => {
  const author = await getUser(id);

  return author;
});

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setNewAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export const { setNewAuthor } = authorSlice.actions;
export default authorSlice.reducer;
