import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { RootState } from '../app/store';

export interface UsersState {
  list: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  list: [],
  status: 'idle',
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
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'idle';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersStatus = (state: RootState) => state.users.status;
