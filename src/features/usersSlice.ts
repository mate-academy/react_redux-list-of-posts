import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersState = {
  data: User[];
};

const initialState: UsersState = {
  data: [],
};

export const getUsersAsync = createAsyncThunk('users/getUsers', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersAsync.pending, state => {
      return { ...state, loading: false };
    });
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      return { ...state, data: action.payload, loading: true };
    });
    builder.addCase(getUsersAsync.rejected, state => {
      return { ...state, error: 'Something went wrong.', loading: true };
    });
  },
});

export const selectUsers = (state: { users: UsersState }) => state.users.data;
export default usersSlice.reducer;
