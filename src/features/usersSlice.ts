/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadUsers.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
