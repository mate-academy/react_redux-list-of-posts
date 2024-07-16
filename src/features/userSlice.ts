/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(init.pending, state => {
        state.loading = true;
      })
      .addCase(init.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(init.rejected, state => {
        state.error = 'Error';
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
