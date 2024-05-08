/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UserState = {
  users: User[];
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  users: [],
  loading: true,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => getUsers());

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
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
      state.error = 'Not user';
    });
  },
});

export default userSlice.reducer;
export const { set } = userSlice.actions;
