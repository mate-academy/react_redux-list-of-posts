/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type Users = {
  users: User[] | null;
};

const initialState: Users = {
  users: null,
};

export const fetchAllUsers = createAsyncThunk<User[], void>(
  'users/fetchAllUsers',
  async () => {
    try {
      const result = await getUsers();

      return result;
    } catch (error) {
      throw error;
    }
  },
);

const usersSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      },
    );
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
