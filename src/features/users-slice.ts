import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type State = {
  value: User[];
  isLoading: boolean;
  error: null | string;
};

const initialState: State = {
  value: [],
  isLoading: false,
  error: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      };
    });
    builder.addCase(init.rejected, state => {
      return {
        ...state,
        error: 'Something went wrong',
        isLoading: false,
      };
    });
  },
});
