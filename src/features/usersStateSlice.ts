import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { User } from '../types/User';

interface UsersState {
  users: User[],
  isLoading: boolean,
  error: null | string,
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'usersState/fetchUsers',
  getUsers,
);

export const usersSlice = createSlice({
  name: 'usersState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error?.message || null;
      });
  },
});

export const selectUsers = (state: RootState) => state.usersState;

export default usersSlice.reducer;
