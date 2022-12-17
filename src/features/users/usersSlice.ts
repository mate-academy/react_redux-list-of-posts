/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const initUsers = createAsyncThunk(
  'users/fetch',
  () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(initUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(initUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default usersSlice.reducer;
