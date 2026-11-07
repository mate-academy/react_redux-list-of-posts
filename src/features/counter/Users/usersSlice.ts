/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const loadUsers = createAsyncThunk('users/fetch', async () => {
  // await delay(3000);
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        state.users = action.payload;
      }

      state.loading = false;
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
