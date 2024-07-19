/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from './fetchUsers';

export interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: boolean;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as boolean;
    });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export const { name: usersSliceName } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
