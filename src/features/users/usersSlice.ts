import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

interface UsersState {
  loaded: boolean;
  hasError: boolean;
  users: User[];
}

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  users: [],
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
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
        loaded: true,
        hasError: false,
        users: action.payload,
      }))
      .addCase(fetchUsers.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
        users: [],
      }));
  },
});

export default usersSlice.reducer;
export type { UsersState };
