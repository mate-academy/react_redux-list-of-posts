import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../servises/api';
import { User } from '../types/User';

type UsersSlice = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersSlice = {
  users: [],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('/users', () => {
  return fetchUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    });

    builder.addCase(loadUsers.rejected, state => {
      return {
        ...state,
        loading: false,
        error: 'Can not fetch users',
      };
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
