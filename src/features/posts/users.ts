/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const init = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

type UsersState = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.users = action.payload;
      })
      .addCase(init.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default usersSlice.reducer;
