import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: User[] = [];

export const loadData = createAsyncThunk('users/fetch', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(loadData.fulfilled, (_, action: PayloadAction<User[]>) => {
      return action.payload;
    });
  },
});

export default usersSlice.actions;
