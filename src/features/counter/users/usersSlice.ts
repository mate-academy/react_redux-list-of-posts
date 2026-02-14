/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User';
import { getUsers } from '../../../api/users';

type UsersState = {
  items: User[] | [];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  items: [],
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
    setUsers: (state, action: PayloadAction<User[] | []>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(initUsers.pending, state => {
      state.loaded = false;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(initUsers.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export default usersSlice.reducer;
