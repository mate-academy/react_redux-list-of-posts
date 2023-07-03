/* eslint-disable no-param-reassign */
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[],
  loading: boolean,
  error: SerializedError | null,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const init = createAsyncThunk(
  'users/fetchUsers',
  () => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
