/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UserState {
  users: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const loadUsersAsync = createAsyncThunk('users/fetchUsers', () =>
  getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(loadUsersAsync.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadUsersAsync.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(loadUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = false;
    });
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
