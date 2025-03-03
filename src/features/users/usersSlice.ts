/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UserState {
  users: User[];
  loaded: boolean;
  hasError: string;
}

const initialState: UserState = {
  users: [],
  loaded: true,
  hasError: '',
};

export const usersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const users = await getUsers();

  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(usersAsync.pending, state => {
        state.loaded = false;
      })

      .addCase(usersAsync.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loaded = true;
        state.users = action.payload;
      });
  },
});

export const users = (state: RootState) => state.users;
export default usersSlice.reducer;
