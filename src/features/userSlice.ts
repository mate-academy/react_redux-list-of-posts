import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { RootState } from '../app/store';

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

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return { ...state, users: action.payload, loading: false };
      })
      .addCase(fetchUsers.rejected, state => {
        return { ...state, error: 'Error', loading: false };
      });
  },
});

export default userSlice.reducer;

const users = (state: RootState) => state.users.users;

export const usersSelector = createSelector([users], value => value);

export const { actions } = userSlice;
