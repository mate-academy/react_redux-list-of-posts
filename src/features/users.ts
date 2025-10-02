import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as User[],
};

export const loadUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }: PayloadAction<User>) {
      state.items.push(payload);
    },
    removeUser(state, { payload }: PayloadAction<User>) {
      return { ...state, items: state.items.filter(u => u.id !== payload.id) };
    },
    clearUsers() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUsers.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadUsers.fulfilled, (state, { payload }) => {
      return { ...state, items: payload, loaded: true };
    });
    builder.addCase(loadUsers.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
