import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

// async fetch users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return getUsers();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUsers.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      });
  },
});

export default usersSlice.reducer;
