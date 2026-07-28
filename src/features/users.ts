/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UserState {
  list: User[] | [];
  status: 'idle' | 'loading' | 'failed';
  selected: User | null;
}

const initialState: UserState = {
  list: [],
  status: 'idle',
  selected: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectUsers = (state: RootState) => state.users.list;

export default usersSlice.reducer;
