/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type TypeState = {
  users: User[];
  loading: boolean;
  error: string;
  author: User | null;
};

const initialState: TypeState = {
  users: [] as User[],
  loading: false,
  error: '',
  author: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
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
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default usersSlice.reducer;
export const { setAuthor } = usersSlice.actions;
