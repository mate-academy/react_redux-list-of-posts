import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type InitialState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  users: [],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Something went wrong';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
