import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { RootState } from '../app/store';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  isLoading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = false;
      // eslint-disable-next-line no-param-reassign
      state.error = 'Something went wrong!';
    });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectIsLoading = (state: RootState) => state.users.isLoading;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
