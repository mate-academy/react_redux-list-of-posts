/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const users = await getUsers();

      return users;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to load users');
    }
  },
);

type UsersState = {
  users: User[];
  loading: boolean;
  hasError: string | null;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  hasError: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.hasError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.hasError = action.payload as string;
      });
  },
});

export default userSlice.reducer;
