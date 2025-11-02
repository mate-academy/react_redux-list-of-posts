/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';
import { getUsers } from '../api/users';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  errorMessage: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
        state.errorMessage = null;
        state.items = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loaded = true;
        state.hasError = true;
        state.errorMessage = action.error.message ?? null;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersHasError = (state: RootState) => state.users.hasError;
export const selectUsersErrorMessage = (state: RootState) =>
  state.users.errorMessage ?? null;

export default usersSlice.reducer;
