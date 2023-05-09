/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const userAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const data = await getUsers();

    return data;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(userAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
