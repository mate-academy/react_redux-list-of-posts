/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { loadUsers } from './usersAPI';

type UsersState = {
  users: User[],
  isLoading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', loadUsers);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.error = 'Some error occured';
      state.isLoading = false;
    });
  },
});

export const { set } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
