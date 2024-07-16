import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UserState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialUsers: UserState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      return { ...state, loading: true };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    });
    builder.addCase(init.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    });
  },
});

export default usersSlice.reducer;
