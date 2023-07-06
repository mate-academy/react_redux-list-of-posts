/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  expanded: boolean,
  userError: boolean,
}

const initialState: UsersState = {
  users: [],
  expanded: false,
  userError: false,
};

export const loadUsers = createAsyncThunk(
  'users/loadUsers',
  async () => {
    const data = await getUsers();

    return data;
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
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(loadUsers.rejected, (state) => {
      state.userError = true;
    });
  },
});

export const { setExpanded } = usersSlice.actions;
export default usersSlice.reducer;
