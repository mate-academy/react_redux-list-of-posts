// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

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

// thunk para carregar os usuários
export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
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
          hasError: false,
        };
      })
      .addCase(loadUsers.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export default usersSlice.reducer;
