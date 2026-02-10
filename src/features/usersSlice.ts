/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: false,
};

export const init = createAsyncThunk('users/fetch', getUsers);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(init.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    });
    builder.addCase(init.rejected, state => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
