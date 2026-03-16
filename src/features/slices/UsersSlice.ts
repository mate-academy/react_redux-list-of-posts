/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  error: string;
  loading: boolean;
};

const initialState: UsersState = {
  users: [],
  error: '',
  loading: false,
};

const getUsersFromServer = createAsyncThunk('users/getUsers', async () => {
  const response = await getUsers();

  return response;
});

const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersFromServer.pending, state => {
      state.loading = true;
    });

    builder.addCase(getUsersFromServer.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong';
    });

    builder.addCase(getUsersFromServer.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
  },
});

export default UsersSlice.reducer;
export { getUsersFromServer };
