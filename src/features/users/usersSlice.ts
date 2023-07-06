/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  hasError: boolean,
}

const initialState: UsersState = {
  users: [],
  hasError: false,
};

export const loadUsers = createAsyncThunk(
  'users/loadUsers',
  async () => {
    const data = await getUsers();

    return data;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(loadUsers.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
