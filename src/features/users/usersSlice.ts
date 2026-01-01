import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import * as usersApi from '../../api/users';

interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const users = await usersApi.getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default usersSlice.reducer;
