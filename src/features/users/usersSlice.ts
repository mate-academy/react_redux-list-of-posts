import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null as string | null,
};

export const usersAsync = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(usersAsync.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loading = true;
    });
    builder.addCase(usersAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
    builder.addCase(usersAsync.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
