/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const fetchUsersAsync
  = createAsyncThunk(
    'users/fetch',
    () => getUsers(),
  );

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: UsersState, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(
      fetchUsersAsync.fulfilled,
      (state: UsersState, action: PayloadAction<User[]>) => {
        state.status = 'idle';
        state.users = action.payload;
      },
    );

    builder.addCase(fetchUsersAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
