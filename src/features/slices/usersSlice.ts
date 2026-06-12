import { User } from '../../types/User';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk(
  'users/fetch',
  (): Promise<User[]> => {
    return getUsers();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.error = 'Something went wrong';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
