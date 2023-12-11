/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export const fetchUsers = createAsyncThunk('users/fetch_Users', () => {
  return getUsers();
});

type State = {
  users: User[],
  error: string | null,
  loading: boolean,
  author: User | null,
};

const initialState: State = {
  users: [],
  error: null,
  loading: false,
  author: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
