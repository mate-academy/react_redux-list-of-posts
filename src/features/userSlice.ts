import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export type UsersState = {
  value: User[];
};

const initialState: UsersState = {
  value: [],
};

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  return getUsers();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    clear: state => {
      return {
        ...state,
        value: [],
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    });
  },
});
