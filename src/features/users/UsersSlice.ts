import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/User';
import type { RootState } from '../../app/store';
import { loadUsers } from './Thunks';

type UsersState = {
  loaded: boolean;
  users: User[];
  hasError: string;
};

const initialState: UsersState = {
  loaded: false,
  users: [],
  hasError: '',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => ({
      ...state,
      hasError: '',
      loaded: false,
    }));
    builder.addCase(loadUsers.fulfilled, (state, action) => ({
      ...state,
      users: action.payload,
      loaded: true,
    }));
    builder.addCase(loadUsers.rejected, (state, action) => ({
      ...state,
      hasError: action.error.message || '',
      loaded: true,
    }));
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersLoaded = (state: RootState) => state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
