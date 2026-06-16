import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  loaded: boolean;
  hasError: boolean;
  items: User[];
};

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const init = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(init.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(init.fulfilled, (_, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(init.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      })),
});
