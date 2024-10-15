/* eslint-disable */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      loadUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export const usersReducer = usersSlice.reducer;
