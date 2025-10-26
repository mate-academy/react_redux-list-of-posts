/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersType = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersType = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk<User[]>('users/init', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Failed to load users';
    });
  },
});

export default usersSlice.reducer;
