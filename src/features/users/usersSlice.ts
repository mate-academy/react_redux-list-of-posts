/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.hasError = false;
      state.loaded = false;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.hasError = false;
      state.loaded = true;
    });
  },
});

export { fetchUsers };
export default usersSlice.reducer;
