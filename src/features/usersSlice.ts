import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users'; // Переконайся у правильному шляху
import type { User } from '../types/User';

export const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
