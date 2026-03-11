/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loading: false,
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
