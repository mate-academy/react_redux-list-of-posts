import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return client.get<User[]>('/users');
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loaded: false,
    hasError: false,
  },
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
