/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUser } from '../../api/users';

import { User } from '../../types';

export interface UserState {
  loading: boolean;
  author: User | null;
  error: string;
}

const initialState: UserState = {
  loading: false,
  author: null,
  error: '',
};

export const fetchAuthor = createAsyncThunk(
  'author/fetchUser',
  async (userId: number) => {
    const author = await getUser(userId);

    return author;
  },
);

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthor.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.author = action.payload;
        state.error = '';
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.loading = false;
        state.author = null;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default authorSlice.reducer;
