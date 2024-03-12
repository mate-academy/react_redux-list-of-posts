import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
/* eslint-disable no-param-reassign */

export const init = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = false;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(init.rejected, state => {
        state.loading = false;
        state.error = 'Error ';
      });
  },
});

export default usersSlice.reducer;
