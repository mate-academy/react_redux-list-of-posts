import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const usersState: UsersState = {
  users: [],
  loading: true,
  error: null,
};

export const userInit = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userInit.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(userInit.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });

    builder.addCase(userInit.rejected, (state) => {
      return {
        ...state,
        loading: false,
        error: 'Error',
      };
    });
  },
});

export default usersSlice.reducer;
