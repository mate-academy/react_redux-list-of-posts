import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const usersFromServer = await getUsers();

  return usersFromServer;
});

/* eslint-disable no-param-reassign */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
