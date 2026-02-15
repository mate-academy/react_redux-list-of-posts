import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  const result = await getUsers().then(usersFromServer => usersFromServer);

  return result;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (_, actions) => {
      return actions.payload;
    });
  },
});

export const usersReducer = usersSlice.reducer;
