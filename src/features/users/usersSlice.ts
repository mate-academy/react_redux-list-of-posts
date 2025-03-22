import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const loadUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadUsers.pending, state => ({
        ...state,
        error: '',
        loading: true,
      }))
      .addCase(loadUsers.fulfilled, (state, action) => ({
        ...state,
        users: action.payload,
        loading: false,
      }))
      .addCase(loadUsers.rejected, (state, action) => ({
        ...state,
        error: action.error.message || '',
        loading: false,
      }));
  },
});

export default usersSlice.reducer;
