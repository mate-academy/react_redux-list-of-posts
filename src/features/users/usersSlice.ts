/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  const value = await getUsers();

  return value;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      loadUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
