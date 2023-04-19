/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

type UserState = {
  user: User | null,
  error: string,
  loading: boolean,
};
const initialUser: UserState = {
  user: null,
  error: '',
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(author.pending, (state) => {
        state.loading = true;
      })
      .addCase(author.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(author.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default userSlice.reducer;

export const author = createAsyncThunk('user/fetch', (userId: number) => {
  return getUser(userId);
});
