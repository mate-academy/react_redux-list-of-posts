/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlise = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(init.rejected, () => {
      throw new Error("can't download users");
    });
  },
});

export default usersSlise.reducer;
