/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.items;

export default usersSlice.reducer;
