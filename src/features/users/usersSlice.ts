/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  error: boolean,
}

const initialState: UsersState = {
  users: [],
  error: false,
};

export const init = createAsyncThunk(
  'users/fetchUsers', () => {
    return getUsers();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(init.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.error = true;
      });
  },
});

export default usersSlice.reducer;
