/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

export interface UserState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UserState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  return getUsers();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loaded = false; // ИСПРАВЛЕНО: Началась загрузка
        state.hasError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
        state.hasError = false;
      })
      .addCase(fetchUsers.rejected, state => {
        state.loaded = true; // ИСПРАВЛЕНО: Загрузка завершена
        state.hasError = true;
      });
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
