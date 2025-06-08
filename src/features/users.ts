// phonesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../utils/fetchClient';
import { RootState } from '../app/store';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await client.get<User[]>('/users');
  return data;
});
/* eslint-disable no-param-reassign */
export const usersSlice = createSlice({
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
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
export const selectAllUsers = (state: RootState) => state.users.items;
