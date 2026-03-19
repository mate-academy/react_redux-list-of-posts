import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersStates {
  loading: boolean;
  hasError: boolean;
  items: User[];
}

const initialState: UsersStates = {
  loading: false,
  hasError: false,
  items: [],
};

export const loadUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => ({
      ...state,
      hasError: false,
      loading: true,
    }));
    builder.addCase(loadUsers.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));
    builder.addCase(loadUsers.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      items: action.payload,
    }));
  },
});

export const { reducer: userReducer } = usersSlice;
