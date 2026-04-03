import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  loading: boolean;
  error: string;
  users: User[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  users: [],
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });
    builder.addCase(init.rejected, state => {
      state.error = 'Error';
      state.loading = false;
    });
    builder.addCase(init.fulfilled, (state, actions) => {
      state.users = actions.payload;
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
