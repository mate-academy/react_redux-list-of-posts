/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export const initUsers = createAsyncThunk('users/fetch', () => getUsers());

const initialState: { users: User[] | [] } = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (
      state,
      action: PayloadAction<User[]>,
    ) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
