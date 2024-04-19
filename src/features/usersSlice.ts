import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { User } from '../types/User';

type UsersState = {
  users: User[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  loaded: false,
  hasError: false,
};

export const loadUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadUsers.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadUsers.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;
