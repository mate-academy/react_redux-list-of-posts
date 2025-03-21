import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();

  return response;
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
