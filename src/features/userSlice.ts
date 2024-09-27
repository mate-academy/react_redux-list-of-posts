import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
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

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          users: action.payload,
          loading: false,
        };
      })
      .addCase(fetchUsers.rejected, state => {
        return { ...state, error: 'Error', loading: false };
      });
  },
});

export default usersSlice.reducer;

const users = (state: RootState) => state.users.users;

export const usersSelector = createSelector([users], value => value);

export const { actions } = usersSlice;
