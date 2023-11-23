/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

type Users = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: Users = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state: Users, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    take: (state: Users, action: PayloadAction<User>) => {
      state.users.filter((user) => user.id !== action.payload.id);
    },
    clear: (state: Users) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: Users) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state: Users, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state: Users) => {
      state.error = 'Somethink went wrond';
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
export const { add, take, clear } = usersSlice.actions;
