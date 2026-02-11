import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  isUsersLoading: boolean;
  errorMessageOnUserLoading: string;
}

const initialState: UsersState = {
  users: [],
  isUsersLoading: false,
  errorMessageOnUserLoading: '',
};

export const loadUsers = createAsyncThunk('users/loadUsers', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      return { ...state, isUsersLoading: true };
    });
    builder.addCase(
      loadUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        return { ...state, users: action.payload, isUsersLoading: false };
      },
    );
    builder.addCase(loadUsers.rejected, state => {
      return {
        ...state,
        isUsersLoading: false,
        errorMessageOnUserLoading: 'an error on users loading',
      };
    });
  },
});

export const { setUsers } = usersSlice.actions;
