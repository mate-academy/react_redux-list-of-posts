import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  value: User[];
};

const initialState: UsersState = {
  value: [],
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      initUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.value = action.payload;
      },
    );
  },
});

export default usersSlice.reducer;
