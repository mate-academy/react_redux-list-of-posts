import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type InitialState = {
  users: User[] | null;
  loading: boolean;
  error: boolean;
};

const initialState: InitialState = {
  users: [],
  loading: false,
  error: false,
};

export const init = createAsyncThunk('user/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => ({
      ...state,
      loading: true,
      error: false,
    }));
    builder.addCase(init.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      users: action.payload,
    }));
    builder.addCase(init.rejected, state => ({
      ...state,
      loading: false,
      error: true,
    }));
  },
});

export default usersSlice.reducer;
