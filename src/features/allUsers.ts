import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { store } from '../app/store';

export const loadUsers = createAsyncThunk('users/loadUsers', async () =>
  getUsers(),
);

const allUsersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (_, action) => action.payload);
  },
});

export default allUsersSlice.reducer;
export type AppDispatch = typeof store.dispatch;
