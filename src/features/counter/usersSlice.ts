/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: string | null;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: null,
};

export const fetchUsersThunk = createAsyncThunk<User[]>(
  'users/fetch',
  async () => {
    return getUsers();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.pending, state => {
        state.loaded = true;
        state.hasError = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loaded = false;
        state.hasError = action.error.message || 'Failed to load users';
      });
  },
});

export default usersSlice.reducer;
