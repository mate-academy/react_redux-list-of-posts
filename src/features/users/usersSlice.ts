import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const initUsers = createAsyncThunk<User[]>('users/fetchUsers', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initUsers.pending, state => {
        return { ...state, loading: true, error: '' };
      })
      .addCase(initUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        return { ...state, users: action.payload, loading: false, error: '' };
      })
      .addCase(initUsers.rejected, state => {
        return {
          ...state,
          loading: false,
          error: 'an error on users loading',
        };
      });
  },
});

export const { setUsers } = usersSlice.actions;
