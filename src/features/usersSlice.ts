import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
