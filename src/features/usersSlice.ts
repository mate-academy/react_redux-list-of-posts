/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[],
  loading: boolean,
  error: boolean,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(init.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    });
  },
});

export default userSlice.reducer;
