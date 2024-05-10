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
  loading: 'idle' | 'pending' | 'failed';
  error: string;
};

const initialState: UsersState = {
  users: [],
  author: null,
  loading: 'idle',
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
        state.loading = 'pending';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = 'idle';
      })
      .addCase(fetchAllUsers.rejected, state => {
        state.loading = 'failed';
        state.error = 'Failed to load users';
      });
  },
});

export const { selectUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
