import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

// Asynchronous Thunk for loading users.
export const loadUsers = createAsyncThunk('users/load', async () => {
  const response = await client.get<User[]>('/users');

  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(loadUsers.rejected, state => {
        return {
          ...state,
          hasError: true,
          loaded: true,
        };
      });
  },
});

export default usersSlice.reducer;
