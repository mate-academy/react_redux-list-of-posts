/* eslint-disable no-param-reassign */
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UsersState {
  users: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const loadUsers = createAsyncThunk('users/getUsers', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default usersSlice.reducer;
