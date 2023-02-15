/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}
const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const loadUsers = createAsyncThunk(
  'users/SET',
  (async () => {
    const response = await getUsers();

    return response;
  }),
);

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const setAllUsers = (state: RootState) => state.users;
export default UsersSlice.reducer;
