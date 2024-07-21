import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUsers } from '../api/users';
import { User } from '../types/User';
import { UserState } from '../types/Reducer';

const initialState: UserState = {
  users: [] as User[],
  selectedUser: null,
};

export const initUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => ({
      ...state,
      selectedUser: action.payload,
    }),
  },

  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
    }));
  },
});

export const { setSelectedUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
