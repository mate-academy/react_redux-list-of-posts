import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  value: User[];
  isLoading: boolean;
  errorText: string;
};

const initialState: InitialState = {
  value: [],
  isLoading: false,
  errorText: '',
};

export const fetchUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        return { ...state, value: action.payload };
      },
    );
    builder.addCase(fetchUsers.rejected, state => {
      return { ...state, errorText: 'Something went wrong' };
    });
  },
});

export default usersSlice.reducer;
