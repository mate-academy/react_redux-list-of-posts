import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  value: User[];
  isLoading: boolean;
  errorText: boolean;
};

const initialState: InitialState = {
  value: [],
  isLoading: false,
  errorText: false,
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
      return { ...state, isLoading: true, errorText: false };
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        return { ...state, value: action.payload };
      },
    );
  },
});

export default usersSlice.reducer;
