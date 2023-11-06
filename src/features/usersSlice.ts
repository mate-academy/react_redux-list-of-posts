/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

type UsersType = {
  users: User[],
  loading: boolean,
  error: boolean,
};

const initialState: UsersType = {
  users: [],
  loading: false,
  error: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
