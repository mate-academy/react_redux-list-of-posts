/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type Users = {
  users: User[],
  selectedUser: User | null,
};

const initialState: Users = {
  users: [],
  selectedUser: null,
};

export const initUsers = createAsyncThunk('getUsers/fetch', getUsers);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      },
    );
  },
});

export default usersSlice.reducer;
export const { setSelectedUser } = usersSlice.actions;
