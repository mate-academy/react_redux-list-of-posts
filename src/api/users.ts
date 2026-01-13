import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUser = (id: number) => {
  return client.get<User[]>(`/users/${id}`);
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

type UsersState = {
  items: User[];
  loading: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(initUsers.pending, state => ({
      ...state,
      loading: true,
    }));

    builder.addCase(initUsers.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));

    builder.addCase(initUsers.fulfilled, (state, action) => ({
      ...state,
      items: action.payload,
      loading: false,
    }));
  },
});
