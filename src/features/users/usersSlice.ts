/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState: { items: User[]; status: 'idle' | 'loading' | 'failed' } = {
  items: [],
  status: 'idle',
};

export const getUsersFromServer = createAsyncThunk(
  'users/getUsers',
  async () => {
    const value = await getUsers();

    return value;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsersFromServer.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUsersFromServer.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(getUsersFromServer.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;
