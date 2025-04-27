/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUser } from '../api/users';
import { RootState } from '../app/store';

interface UsersState {
  author: User | null;
}
const initialState: UsersState = {
  author: null,
};

export const fetchAuthor = createAsyncThunk(
  'author/fetch',
  async (id: number) => {
    const author = await getUser(id);

    return author;
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.author = action.payload;
    });
  },
});

export const selectAuthor = (state: RootState) => state.author;
export default authorSlice.reducer;
