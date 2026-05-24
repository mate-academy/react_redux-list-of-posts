/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../../api/users';
import { User } from '../../../types/User';
export interface UsersState {
  items: User[] | null;
}
const initialState: UsersState = {
  items: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default usersSlice.reducer;
