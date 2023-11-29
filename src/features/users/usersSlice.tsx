/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '../../services/users';
import { User } from '../../types/User';

type State = {
  value: User[]
  isLoading: boolean;
  error: null | string;
};

const initialState: State = {
  value: [],
  isLoading: false,
  error: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return fetchUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    set: (state, action: PayloadAction<User[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Something went wrong';
      state.isLoading = false;
    });
  },
});
