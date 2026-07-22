/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UserState {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.hasError = false;
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.users = [];
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default userSlice.reducer;
