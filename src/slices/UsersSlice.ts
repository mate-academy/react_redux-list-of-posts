/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';
import { getUsers } from '../api/users';

export interface UsersState {
  users: User[] | null;
  loading: boolean;
  error: string;
  expanded: boolean;
}

const initialState: UsersState = {
  users: null,
  loading: false,
  error: '',
  expanded: false,
};

export const initFetch = createAsyncThunk('user/FETCH', () => getUsers());

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setExpanded: state => {
      state.expanded = !state.expanded;
    },
  },
  extraReducers: builder => {
    builder.addCase(initFetch.pending, state => {
      state.loading = true;
    });

    builder.addCase(initFetch.fulfilled, (state, actions) => {
      state.users = actions.payload;
      state.loading = false;
    });

    builder.addCase(initFetch.rejected, state => {
      state.error = 'error';
    });
  },
});

export const { setExpanded } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users; // Example selector

export default usersSlice.reducer;
