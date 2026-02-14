import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  selectedUser: User | null;
};

const initialState: UsersState = {
  users: [],
  selectedUser: null,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, selectedUser: action.payload };
    },
  },
  extraReducers: builder => {
    builder.addCase(initUsers.fulfilled, (state, action) => {
      return { ...state, users: action.payload };
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { setUser } = usersSlice.actions;
