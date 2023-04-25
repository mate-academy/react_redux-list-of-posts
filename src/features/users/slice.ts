/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/Status';
import { User } from '../../types/User';
import { fetchUsers } from './thunks';

export interface UsersState {
  items: User[];
  status: Status;
}

const initialState: UsersState = {
  items: [],
  status: Status.pending,
};

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

export default usersSlice.reducer;
