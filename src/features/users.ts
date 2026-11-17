import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await getUsers();

  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.isLoading = false;
        state.error = 'Something went wrong';
      });
  },
});

export const userReducer = userSlice.reducer;
