import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const loadUsers = createAsyncThunk('users/load', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load users';
      });
  },
});

export default usersSlice.reducer;
