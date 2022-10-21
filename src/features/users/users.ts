/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface InitialState {
  users: User[] | null,
  status: 'idle' | 'failed' | 'pending' | 'fullfilled',
  error: string | null;
}

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const initialState: InitialState = {
  users: null,
  status: 'idle',
  error: 'error',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'pending';
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = 'fullfilled';
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.error = 'Something went wrong';
      state.status = 'failed';
    });
  },
});

export default usersSlice.reducer;
