import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = User[];

const initialState: UsersState = [];

export const initUsers = createAsyncThunk('users/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(initUsers.fulfilled, (__, action) => {
      return action.payload;
    });
  },
});

export const usersReducer = usersSlice.reducer;
