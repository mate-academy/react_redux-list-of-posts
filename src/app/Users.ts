import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
/*eslint-disable*/
export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetchAll', () => {
  return client.get<User[]>('/users');
});

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
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});
