import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  users: [],
  status: 'idle',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        return {
          ...state,
          status: 'loading',
        };
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'idle',
          users: action.payload,
        };
      })
      .addCase(loadUsers.rejected, (state) => {
        return {
          ...state,
          status: 'failed',
        };
      });
  },
});

export default usersSlice.reducer;
