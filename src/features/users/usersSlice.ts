/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const getUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const value = await getUsers();

  return value;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
