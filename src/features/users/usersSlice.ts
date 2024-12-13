import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadUsers.fulfilled,
      (_state, action: PayloadAction<User[]>) => {
        return action.payload;
      },
    );
  },
});

export default usersSlice.reducer;
