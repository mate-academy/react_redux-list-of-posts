/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
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

export const initUsers = createAsyncThunk('users/fetchUsers', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.users.filter(user => user.id !== action.payload);
    },
    clear: state => {
      state.users = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initUsers.pending, (state: UsersState) => {
        state.status = 'loading';
      })
      .addCase(
        initUsers.fulfilled,
        (state: UsersState, action: PayloadAction<User[]>) => {
          state.status = 'idle';
          state.users = action.payload;
        },
      )
      .addCase(initUsers.rejected, (state: UsersState) => {
        state.status = 'failed';
      });
  },
});

export const { add, remove, clear } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
