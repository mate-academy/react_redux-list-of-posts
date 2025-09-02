/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { UsersState } from '../types/UsersState';
import { RootState } from '../app/store';

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
  selectedUserId: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const data = await client.get<User[]>('/users');

  return data;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
      state.loaded = false;
      state.hasError = false;
    },
    setUsersError: state => {
      state.hasError = true;
      state.loaded = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.items = action.payload;
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
