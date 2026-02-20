import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: string;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

/* eslint-disable no-param-reassign */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loaded = false;
      state.hasError = '';
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
      state.hasError = '';
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.loaded = true;
      state.hasError = 'Error';
    });
  },
  /* eslint-enable no-param-reassign */
});

export default usersSlice.reducer;
