/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await getUsers();

  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action) => {
        state.users = action.payload;
      },
    );
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
