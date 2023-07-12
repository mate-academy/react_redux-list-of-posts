import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UserState = {
  users: User[],
  loading: boolean,
  error: null | string,
};
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const initUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(initUsers.rejected, (state) => {
      state.error = 'Unable to load users from server';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
