import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  loaded: boolean;
  hasError: boolean;
  users: User[];
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  users: [],
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await getUsers();
    return users;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line no-param-reassign
      .addCase(fetchUsers.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      // eslint-disable-next-line no-param-reassign
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.users = action.payload;
      })
      // eslint-disable-next-line no-param-reassign
      .addCase(fetchUsers.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
        state.users = [];
      });
  },
});

export default usersSlice.reducer;
export type { UsersState };
