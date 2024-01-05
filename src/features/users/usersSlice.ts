import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [] as User[],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  getUsers,
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';// eslint-disable-line no-param-reassign
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';// eslint-disable-line no-param-reassign
        state.users = action.payload;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';// eslint-disable-line no-param-reassign
      });
  },
});

export default usersSlice.reducer;
