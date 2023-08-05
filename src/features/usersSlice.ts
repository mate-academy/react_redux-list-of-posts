import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = {
  list: User[];
  loaded: boolean;
  hasError: boolean;
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await getUsers();

    return response;
  },
);

const initialState: UsersState = {
  list: [],
  loaded: false,
  hasError: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loaded = true;
        state.hasError = false;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loaded = false;
      })

      .addCase(fetchUsers.rejected, (state) => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;
