/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  loading: boolean,
  hasError: boolean,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: false,
};

export const usersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersAsync.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(usersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.hasError = false;
      })
      .addCase(usersAsync.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
