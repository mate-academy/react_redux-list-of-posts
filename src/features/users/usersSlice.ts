/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import * as usersApi from '../../api/users';

interface UsersState {
  users: User[],
  expanded: boolean,
}

const initialState: UsersState = {
  users: [],
  expanded: false,
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  () => {
    return usersApi.getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setExpanded: (state, action: PayloadAction<boolean>) => {
      state.expanded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default usersSlice.reducer;
export const { setExpanded } = usersSlice.actions;
