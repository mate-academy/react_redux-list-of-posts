/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

export const loadUsers = createAsyncThunk(
  'users/loadUsers',

  async () => {
    const users = await getUsers();

    return users;
  },
);

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
    builder
      .addCase(loadUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(loadUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
