import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { RootState } from '../app/store';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

/* eslint-disable no-param-reassign */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
