import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

const initialState: User[] = [];

export const init = createAsyncThunk('users/fetch', async () => {
  const loadedUsers = await getUsers();

  return loadedUsers;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.fulfilled, (_value, action: PayloadAction<User[]>) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;
