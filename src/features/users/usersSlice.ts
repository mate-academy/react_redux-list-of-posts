import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

// Busca os usuários na API
export const loadUsers = createAsyncThunk('users/load', async () => {
  return getUsers();
});

type UsersState = {
  items: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

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
