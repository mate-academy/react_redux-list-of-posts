/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[] | [];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk('users/fetch', async () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<User[] | []>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      state.loaded = true;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = false;
    });

    builder.addCase(initUsers.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export default usersSlice.reducer;
