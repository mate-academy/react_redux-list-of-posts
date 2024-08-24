/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Users = User[];

const initialState: Users = [];

export const init = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      init.fulfilled,
      (state, action) => (state = action.payload),
    );
  },
});

export default usersSlice.reducer;
