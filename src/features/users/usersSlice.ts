/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import type { RootState } from '../../app/store';

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

type State = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: State = {
  users: [],
  loading: false,
  error: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export const selectUserState = (state: RootState) => state.users;
export default usersSlice.reducer;
