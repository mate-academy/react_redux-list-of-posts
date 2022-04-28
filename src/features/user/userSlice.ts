/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../api/api';

const initialState: UserState = {
  users: [],
  selectedUserId: 0,
  isUsersLoading: false,
};

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (): Promise<User[]> => {
    return getData('/users');
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserId: (state: UserState, action) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending.type]: (state: UserState) => {
      state.isUsersLoading = true;
    },
    [getUsers.fulfilled.type]: (state: UserState, action) => {
      state.isUsersLoading = false;
      state.users = action.payload;
    },
    [getUsers.rejected.type]: (state: UserState) => {
      state.isUsersLoading = false;
    },
  },
});

export const { changeUserId } = userSlice.actions;

export default userSlice.reducer;
