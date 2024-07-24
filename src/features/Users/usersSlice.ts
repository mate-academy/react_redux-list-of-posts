/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [] as User[],
  status: 'idle',
};

export const AsyncGetUsers = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(AsyncGetUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(AsyncGetUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(AsyncGetUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const Users = (state: RootState) => state.counter.value;

export default usersSlice.reducer;
