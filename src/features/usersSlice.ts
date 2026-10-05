import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  loaded: boolean;
  hasError: boolean;
  items: User[];
};

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchUsers.rejected, state => {
        return { ...state, loaded: true, hasError: true };
      });
  },
});

export default usersSlice.reducer;
