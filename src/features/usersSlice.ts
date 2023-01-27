/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type StateType = {
  users: User[],
  loaded: boolean;
  hasError: boolean;
};

const initialState: StateType = {
  users: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loaded = false;
    });

    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loaded = true;
      });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
  },
});

export default usersSlice.reducer;
