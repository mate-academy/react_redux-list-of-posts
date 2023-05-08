/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from './usersAPI';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const init = createAsyncThunk('users/fetch', async () => {
  const allUsers = await getUsers();

  return allUsers;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
