/* eslint-disable no-param-reassign */
// src/store/usersSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users as User[];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // optional reducers if needed later
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.items = [];
        state.loaded = true; // spinner should stop even if error
        state.hasError = true;
      });
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
