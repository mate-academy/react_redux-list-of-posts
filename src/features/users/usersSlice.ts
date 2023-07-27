/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';
import { Status } from '../../types/Status';

export interface UsersState {
  users: User[],
  selectedUser: User | null,
  status: Status,
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  status: Status.Idle,
};

export const getUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = Status.Idle;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = Status.Failed;
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
