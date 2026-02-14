import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
