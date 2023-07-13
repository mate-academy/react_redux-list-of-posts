/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[],
  author: User | null,
}

const initialState: UsersState = {
  users: [],
  author: null,
};

export const getUsersAsync = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
