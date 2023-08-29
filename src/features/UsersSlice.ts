/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: User[] = [];

export const initUsers = createAsyncThunk('users/initUsers', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(initUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state = action.payload;

        return state;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
