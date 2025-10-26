/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersType = {
  users: User[];
  loading: boolean;
  error: string;
  author: User | null;
};

const initialState: UsersType = {
  users: [] as User[],
  loading: false,
  error: '',
  author: null,
};

export const init = createAsyncThunk<User[]>('users/init', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Failed to loading users';
    });
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
