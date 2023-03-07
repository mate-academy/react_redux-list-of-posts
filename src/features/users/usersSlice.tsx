/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  error: string;
};

export const init = createAsyncThunk('users/fetch', getUsers);

const initialState: UsersState = {
  users: [],
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Unable to load users!';
    });
  },
});

export default usersSlice.reducer;
