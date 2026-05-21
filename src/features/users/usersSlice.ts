import { User } from '../../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users as User[];
});

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const UsersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export default UsersSlice.reducer;
