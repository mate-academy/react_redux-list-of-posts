/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

const initialState = {
  users: [] as User[],
  hasError: false,
  loaded: false,
};

export const loadUsers = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadUsers.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loaded = false;
      });
  },
});

export default usersSlice.reducer;

export const selectUsers = (state: RootState) => state.users;
