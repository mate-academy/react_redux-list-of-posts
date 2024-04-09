import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUsers } from '../../api/users';

import { User } from '../../types/User';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string;
  author: User | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: '',
  author: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', () => getUsers());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      /*eslint no-param-reassign: "error"*/
      state.author = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUsers.rejected, state => {
      state.isLoading = false;
      state.error = 'Unable to load users';
    });
  },
});

export const { setAuthor } = usersSlice.actions;

export default usersSlice.reducer;
