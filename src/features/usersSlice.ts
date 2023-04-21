/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';
import { User } from '../types/User';
import { getUsers } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

export interface UsersState {
  items: User[];
  status: Status;
}

const initialState: UsersState = {
  items: [],
  status: Status.pending,
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  () => getUsers(),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = Status.pending;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.fulfilled;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = Status.rejected;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.items;

export default usersSlice.reducer;
