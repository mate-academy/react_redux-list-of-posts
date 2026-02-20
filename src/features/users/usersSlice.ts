/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { DataState } from '../../types/DataState';
import { getUsers } from '../../api/users';

const initialState: DataState<User> = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUsers();

      return users;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });
  },
});

export default usersSlice.reducer;
