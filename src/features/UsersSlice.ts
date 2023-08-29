/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = {
  users: User[]
};

const initialState: State = {
  users: [],
};

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
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
