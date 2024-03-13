/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUsers } from '../../utils/thunks/fetchUsers';

export interface UsersState {
  users: User[];
  author: User | null;
}

const initialState: UsersState = {
  users: [],
  author: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
    clearSelectedUser: state => {
      state.author = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setSelectedUser, clearSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
