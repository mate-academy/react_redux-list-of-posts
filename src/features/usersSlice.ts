import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = User[];

const initialState: UsersState = [];

export const init = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_state, action) => action.payload);
  },
});

export default usersSlice.reducer;
