import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types/User';
import { getUsers } from './api/users';

const initialState: User[] = [];

export const usersAsync = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      usersAsync.fulfilled,
      (_state, action: PayloadAction<User[]>) => {
        return action.payload;
      },
    );
  },
});

export default usersSlice.reducer;
