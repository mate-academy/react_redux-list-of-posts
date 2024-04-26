/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface UsersState {
  users: User[];
  loading: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: false,
};

export const loadUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsersAsync.pending, state => {
        state.loading = true;
      })
      .addCase(loadUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(loadUsersAsync.rejected, state => {
        state.hasError = true;
      });
  },
});

export const usersState = (state: RootState) => state.users;

export default usersSlice.reducer;
