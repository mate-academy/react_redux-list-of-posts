import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

const userState: User[] = [];

export const loadUsers = createAsyncThunk('load/users', getUsers);

const userSlice = createSlice({
  name: 'users',
  initialState: userState as User[],
  reducers: {},

  extraReducers: (bulider) => {
    bulider.addCase(loadUsers.fulfilled, (_, action: PayloadAction<User[]>) => (
      action.payload
    ));
  },
});

export default userSlice.reducer;
