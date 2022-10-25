/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

import { RootState } from '../../app/store';
import { User } from '../../types/User';

type UserType = {
  // id: number;
  // name: string;
  // email: string;
  // phone: string;
};

export interface UsersState {
  value: UserType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  value: [],
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const value = await getUsers();

    // The value we return becomes the `fulfilled` action payload
    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value.push(action.payload);
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clear } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.value;

export default usersSlice.reducer;
