/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';

type UsersSlice = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
};
const initialState: UsersSlice = {
  users: [],
  isLoading: false,
  hasError: false,
};

export const loadUsersAsync = createAsyncThunk('users/load', async () => {
  const users = await getUsers();

  return users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadUsersAsync.pending, (state: UsersSlice) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        loadUsersAsync.fulfilled,
        (state: UsersSlice, { payload }: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.users = payload;
        },
      )
      .addCase(loadUsersAsync.rejected, (state: UsersSlice) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
export const selectUsers = (state: RootState) => state.users;
