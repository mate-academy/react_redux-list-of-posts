/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[],
  error: string,
  loading: boolean,
};

const initialState: UsersState = {
  users: [],
  error: '',
  loading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(init.pending, (state) => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default usersSlice.reducer;

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});
