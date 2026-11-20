import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

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

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchUsers.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }));
  },
});

export default usersSlice.reducer;
