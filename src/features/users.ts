/* eslint-disable no-param-reassign */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[];
  isLoaded: boolean;
  hasError: boolean;
  author: User | null;
}

const initialState = {
  users: [] as UsersState['users'],
  isLoaded: false,
  hasError: false,
  author: null as UsersState['author'],
};

export const fetchUsers = createAsyncThunk(
  'users/fetch',
  async () => {
    const usersFromServer = await getUsers();

    return usersFromServer;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoaded = false;
    })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoaded = true;
        state.hasError = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoaded = true;
      });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
