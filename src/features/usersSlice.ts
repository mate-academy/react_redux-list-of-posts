import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const initialState = {
  items: [] as User[],
  loaded: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export default usersSlice.reducer;
