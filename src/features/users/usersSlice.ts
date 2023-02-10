import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState: User[] = [];

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const users = getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled,
      (_state, action: PayloadAction<User[]>) => {
        return action.payload;
      });
  },
});

export default usersSlice.reducer;
