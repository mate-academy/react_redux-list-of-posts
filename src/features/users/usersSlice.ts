/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

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

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

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
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
