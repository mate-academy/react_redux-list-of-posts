// src/slices/usersSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = { items: [], loaded: false, hasError: false };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;
