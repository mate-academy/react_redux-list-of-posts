/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await getUsers();

  return response;
});

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loaded = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});
