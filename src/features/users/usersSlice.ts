/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[],
  error: string,
};

const initialState: UsersState = {
  users: [],
  error: '',
};

export const getAsyncUsers = createAsyncThunk('users/get', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAsyncUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(getAsyncUsers.rejected, (state) => {
      state.error = 'Something went wrong while trying to load users.';
    });
  },
});

export default usersSlice.reducer;
