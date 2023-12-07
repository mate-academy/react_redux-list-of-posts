/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[],
  loaded: boolean,
  hasError: boolean,
  author: User | null,
}

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
  author: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => getUsers(),
);

const userSlice = createSlice({
  name: 'usres',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(fetchUsers.fulfilled, (state, actions) => {
        state.loaded = true;
        state.users = actions.payload;
      });
  },
});

export default userSlice.reducer;
export const { setAuthor } = userSlice.actions;
