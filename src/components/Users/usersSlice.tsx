/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../utils/axiosClient';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface UsersState {
  users: User[];
  loading: 'idle' | 'loading' | 'failed';
  error: string,
}

const initialState: UsersState = {
  users: [],
  loading: 'idle',
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return client.get<User[]>('/users');
});

export const usersSlice = createSlice(
  {
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = 'idle';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = 'loading';
          state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state) => {
          state.loading = 'failed';
          state.error = 'Failed to fetch';
        });
    },
  },
);

export const getUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
