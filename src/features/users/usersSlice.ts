/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UserState {
  items: User[];
  loading: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await getUsers();

  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;
