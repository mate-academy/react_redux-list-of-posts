import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

export interface UsersState {
  items: User[];
  status: 'start' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: UsersState = {
  items: [],
  status: 'start',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => ({
        ...state,
        status: 'pending',
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        status: 'fulfilled',
        items: action.payload,
      }))
      .addCase(fetchUsers.rejected, state => ({
        ...state,
        status: 'rejected',
      }));
  },
});

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
