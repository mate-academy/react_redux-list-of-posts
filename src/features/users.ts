/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsersAsync = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
