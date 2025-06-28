/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState = {
  items: [] as User[],
  loaded: false as boolean,
  error: false as boolean,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    return getUsers();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.error = true;
      });
  },
});

export default usersSlice.reducer;
