import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';
import { client } from '../utils/fetchClient';

type UsersState = {
  items: User[];
  loading: boolean;
  error: boolean;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/users');

  return response;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        return { ...state, loading: true, error: false };
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        return { ...state, loading: false, items: action.payload };
      })
      .addCase(fetchUsers.rejected, state => {
        return { ...state, loading: false, error: true };
      });
  },
});

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
