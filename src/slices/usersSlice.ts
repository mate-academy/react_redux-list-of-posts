/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  loaded: boolean;
  hasError: boolean;
  items: User[];
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => {
          state.loaded = true;
          state.hasError = false;
          state.items = action.payload;
        })
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
