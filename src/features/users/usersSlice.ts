/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[],
  error: string,
};

const initialState: UsersState = {
  users: [],
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Error fetching users';
    });
  },
});

export default usersSlice.reducer;
