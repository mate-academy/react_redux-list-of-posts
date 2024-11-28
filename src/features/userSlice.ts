import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        return {
          ...state,
          users: action.payload,
        };
      },
    );
  },
});

export default usersSlice.reducer;
