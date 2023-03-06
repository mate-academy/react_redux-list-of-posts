import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

export const usersAsync = createAsyncThunk(
  'users/usersAsync',
  async () => {
    const users = await getUsers();

    return users;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersAsync.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(usersAsync.fulfilled, (state, action) => ({
        ...state,
        status: 'idle',
        users: action.payload,
      }))
      .addCase(usersAsync.rejected, (state) => ({
        ...state,
        status: 'failed',
      }));
  },
});

export default usersSlice.reducer;
