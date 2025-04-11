/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const BASE_URL = 'https://mate.academy/students-api';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const loadUsers = createAsyncThunk(`${BASE_URL}/users`, async () => {
  return getUsers();
});

export const goodsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
  },
});

export default goodsSlice.reducer;
export const { setUsers } = goodsSlice.actions;
