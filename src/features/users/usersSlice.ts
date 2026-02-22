import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/User';

type UsersState = {
  loaded: boolean;
  hasError: boolean;
  items: User[];
};

const initialState: UsersState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    // заміни на свій клієнт:
    // return getUsers();
    const res = await fetch('/api/users.json');

    if (!res.ok) {
      throw new Error('Failed to load users');
    }

    return res.json();
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true; // “завантаження завершилось з помилкою”
        state.hasError = true;
      });
  },
});

export default usersSlice.reducer;

// селектори
export const selectUsers = (s: { users: UsersState }) => s.users.items;
export const selectUsersLoaded = (s: { users: UsersState }) => s.users.loaded;
export const selectUsersHasError = (s: { users: UsersState }) =>
  s.users.hasError;
