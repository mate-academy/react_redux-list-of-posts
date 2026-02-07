/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';

export interface AuthorState {
  item: User | null;
  loaded: boolean;
  hasError: boolean;
}

const initialState: AuthorState = {
  item: null,
  loaded: false,
  hasError: false,
};

export const authorAsync = createAsyncThunk(
  'author/fetch',
  async (itemId: number) => {
    const author = await getUser(itemId);

    return author;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authorAsync.pending, state => {
        state.hasError = false;
        state.loaded = false;
        state.item = null;
      })
      .addCase(authorAsync.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loaded = true;
      })
      .addCase(authorAsync.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default authorSlice.reducer;
