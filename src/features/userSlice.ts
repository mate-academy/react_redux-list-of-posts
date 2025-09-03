import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loading: false,
      }))
      .addCase(fetchUsers.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message || 'Error fetching users',
      }));
  },
});

export default usersSlice.reducer;
