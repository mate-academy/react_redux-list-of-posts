import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  items: User[];
}

const initialState: UsersState = {
  items: [],
};

export const loadUsers = createAsyncThunk('users/load', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const selectUsers = (state: RootState) => state.users.items;

export default usersSlice.reducer;
