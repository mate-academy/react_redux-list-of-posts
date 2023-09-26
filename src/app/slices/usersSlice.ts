/* eslint-disable no-param-reassign */
import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsersAction } from '../thunks/usersThunk';

const initialState: UsersState = {
  users: [],
  author: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(getUsersAction.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export const { setAuthor } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

export interface UsersState {
  users: User[],
  author: User | null,
  loading: boolean,
  error: SerializedError | null
}
