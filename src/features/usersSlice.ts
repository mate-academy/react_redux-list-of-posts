/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { Maybe } from '../types/Maybe';
import { getUsers } from '../api/users';

interface UsersState {
  users: User[];
  usersIsloading: boolean;
  usersError: Maybe<string>;
  selectedUserId: Maybe<number>;
}

const initialState: UsersState = {
  users: [],
  usersIsloading: false,
  usersError: null,
  selectedUserId: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetch_users',
  getUsers,
);

export const usersStateSlice = createSlice({
  name: 'usersState',
  initialState,
  reducers: {
    selectUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.usersIsloading = true;
      state.usersError = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersIsloading = false;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.usersError = action.error.name || null;
      state.usersIsloading = false;
    });
  },
});

export const { selectUserId } = usersStateSlice.actions;
export default usersStateSlice.reducer;
