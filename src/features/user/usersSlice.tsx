/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UserState {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  users: [],
  hasError: false,
  isLoading: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export default usersSlice.reducer;
