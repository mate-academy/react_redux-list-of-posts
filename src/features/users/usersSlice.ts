/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type InitialState = {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: InitialState = {
  users: [],
  status: 'idle',
};

export const allUsers = createAsyncThunk('users/fetch', async () => {
  const res = await getUsers();

  return res;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(allUsers.fulfilled, (state, action) => {
      state.status = 'idle';
      state.users = action.payload;
    });
    builder.addCase(allUsers.rejected, state => {
      state.status = 'failed';
    });
    builder.addCase(allUsers.pending, state => {
      state.status = 'loading';
    });
  },
});

export default usersSlice.reducer;
