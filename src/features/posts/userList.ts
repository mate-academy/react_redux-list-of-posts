import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

const initialState: User[] = [];

export const init = createAsyncThunk('user/fetch', () => getUsers());

export const { reducer, actions } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setList: (_users, action: PayloadAction<User[]>) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(init.fulfilled, (_user, action) => action.payload);
  },
});
