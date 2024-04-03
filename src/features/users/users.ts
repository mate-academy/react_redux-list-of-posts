import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

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

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

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
    builder.addCase(initUsers.pending, state => {
      /*eslint no-param-reassign: "error"*/
      state.loading = true;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      /*eslint no-param-reassign: "error"*/
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(initUsers.rejected, state => {
      /*eslint no-param-reassign: "error"*/
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export const { setAuthor } = usersSlice.actions;

export default usersSlice.reducer;
