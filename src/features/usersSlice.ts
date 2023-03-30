/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type Users = {
  users: User[],
  user: User | null
};

const initialState: Users = {
  users: [],
  user: null,
};

export const initUsers = createAsyncThunk('users/fetch', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const findUser = state.users.find((user) => user.id === action.payload);

      if (findUser !== undefined) {
        state.user = findUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;

      return state;
    });
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
