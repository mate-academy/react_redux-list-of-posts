import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type UsersState = {
  users: User[];
  loaded: boolean;
  error: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  error: false,
};

export const initUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });
    builder.addCase(initUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.error = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
    builder.addCase(initUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });
  },
});

export default userSlice.reducer;
