import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState: User[] = [];

export const init = createAsyncThunk('users/fetch', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(_, action: PayloadAction<User[]>) {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
