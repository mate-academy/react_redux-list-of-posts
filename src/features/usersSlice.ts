/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return getUsers();
});
type State = {
  users: User[],
  author: User | null,
  loaded: boolean,
  error: string | null,
};

const initialState: State = {
  users: [],
  author: null,
  loaded: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loaded = true;
        state.error = 'error';
      });
  },
});

export const { setAuthor } = usersSlice.actions;

export default usersSlice.reducer;
