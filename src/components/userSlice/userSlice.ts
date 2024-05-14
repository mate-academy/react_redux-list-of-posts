/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/users';
import { User } from '../../types/User';

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () =>
  getUsers(),
);

type UsersState = {
  users: User[];
  author: User | null;
  loading: boolean;
  error: string;
};

const initialState: UsersState = {
  users: [],
  author: null,
  loading: false,
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.author = action.payload;
    },

    removeUser: state => {
      state.error = '';
      state.author = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllUsers.rejected, state => {
        state.loading = false;
        state.error = 'Failed to load users';
      });
  },
});

export const { selectUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
