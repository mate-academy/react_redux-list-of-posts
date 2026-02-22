/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};
const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set(state, action) {
      state.author = action.payload;
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
