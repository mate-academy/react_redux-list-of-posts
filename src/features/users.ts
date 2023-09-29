import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types';

const initialState: User[] = [];

export const init = createAsyncThunk('users/fetch', getUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});
