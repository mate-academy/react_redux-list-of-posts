/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(loadUsers.rejected, state => {
      state.error = 'error';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
