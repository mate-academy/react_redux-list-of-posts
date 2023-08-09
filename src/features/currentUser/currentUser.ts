/* eslint-disable no-param-reassign, @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../../api/users';
import { User } from '../../types/User';

type CurrentUser = {
  user: User | any // here i used any, cause action in 34 line equals User[]... i dont now how to solve it.
  loading: boolean,
  error: string,
};

const initialState: CurrentUser = {
  user: null,
  loading: false,
  error: '',
};

export const init = createAsyncThunk('currentUser/fetch', (userId: number) => {
  return getUser(userId);
});

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    set: (state: CurrentUser, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    remove: (state: CurrentUser) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state: CurrentUser) => {
      state.loading = true;
    });

    builder.addCase(init.rejected, (state: CurrentUser) => {
      state.loading = false;
      state.error = 'Error';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export default currentUserSlice.reducer;
export const { set, remove } = currentUserSlice.actions;
