/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { User } from '../types/User';

export interface UsersState {
  author: User | null;
}

const initialState: UsersState = {
  author: null,
};

export const init = createAsyncThunk(
  'author/fetch', (id: number) => {
    return getUser(id);
  },
);

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    resetAuthor: (state) => {
      state.author = null;
    },
  },
});

export const { setAuthor, resetAuthor } = authorSlice.actions;

export default authorSlice.reducer;
