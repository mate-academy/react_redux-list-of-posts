import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';

const initialState = [] as User[];

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const { reducer, actions } = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      loadUsers.fulfilled,
      (_, action: PayloadAction<User[]>) => action.payload,
    );
  },
});

export const usersSelector = (state: RootState) => state.users;
