import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

export const fetchUsers = createAsyncThunk(
  '/users',
  async () => {
    const value = await getUsers();

    return value;
  },
);

const initialState: [] | User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      if (state) {
        const value = action.payload;

        return value;
      }

      return state;
    });
  },
});

export const loadUsers = (state: RootState) => state.users;
