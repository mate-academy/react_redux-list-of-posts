/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { User } from '../types/User';

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
