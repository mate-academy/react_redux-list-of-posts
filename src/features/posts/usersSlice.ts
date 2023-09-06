/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export type UserState = {
  users: User[];
};

const initState: UserState = {
  users: [],
};

export const getUsersAsync = createAsyncThunk(
  'users/getUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
