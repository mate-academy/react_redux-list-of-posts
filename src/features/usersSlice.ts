/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
