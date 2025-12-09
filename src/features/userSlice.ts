import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as usersApi from '../api/users';
import { User } from '../types/User';
import { RootState } from '../app/store';

export type UserState = {
  items: User[];
  loading: boolean;
  hasError: boolean;
};

const initialState: UserState = {
  items: [],
  loading: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk<User[]>(
  'users/loadUsers',
  async () => {
    const users = await usersApi.getUsers();

    return users;
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = true;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.items = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.loading = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
      });
  },
});

export const usersReducer = userSlice.reducer;

// Selectors
export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.hasError;
