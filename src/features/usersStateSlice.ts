import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

interface State {
  users: User[],
  isLoading: boolean,
  error: null | string,
}

const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'usersState/fetchUsers',
  getUsers,
);

export const usersStateSlice = createSlice({
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

export default usersStateSlice.reducer;
