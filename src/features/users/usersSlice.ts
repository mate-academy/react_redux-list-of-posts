import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { client } from '../../utils/fetchClient';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return client.get<User[]>('/users');
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
