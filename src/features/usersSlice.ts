import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/user';

export const init = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_users: User[], action) => action.payload,
  },

  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (_users, action) => action.payload);
  },
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
