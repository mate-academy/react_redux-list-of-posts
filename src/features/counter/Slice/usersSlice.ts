import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../../api/users';
import { User } from '../../../types/User';

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

const initialState = {
  items: [] as User[],
  isLoading: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
        hasError: false,
      };
    });

    builder.addCase(loadUsers.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});
