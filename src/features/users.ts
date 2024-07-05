/* eslint-disable no-param-reassign */
import { Slice, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: User[] = [];

export const init = createAsyncThunk('users/fetch', getUsers);

const usersSlice: Slice<User[]> = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
