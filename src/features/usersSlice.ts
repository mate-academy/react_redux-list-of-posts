/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { UsersState } from '../types/UserState';

export const getUsersAsync = createAsyncThunk(
  'users/getUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
