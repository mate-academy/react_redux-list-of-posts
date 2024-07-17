/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const init = createAsyncThunk<User[], void>('users/fetch', async () => {
  return getUsers();
});

type Users = {
  users: User[];
  error: string | null;
};

const initialState: Users = {
  users: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
