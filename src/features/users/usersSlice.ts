import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsers.fulfilled,
      (_s, action: PayloadAction<User[]>) => action.payload,
    );
  },
});

export default usersSlice.reducer;
