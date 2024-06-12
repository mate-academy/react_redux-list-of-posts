import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: false,
};

export const initUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
    });
    builder.addCase(initUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
    });
    builder.addCase(initUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = true;
    });
  },
});

export default usersSlice.reducer;
