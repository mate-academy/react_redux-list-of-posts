/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { Post } from '../types/Post';

type UsersState = {
  users: User[];
  isLoading: boolean;
  errorMessage: string;
  selectedUser: User | null;
  setSelectedPost: Post | null;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  errorMessage: '',
  selectedUser: null,
  setSelectedPost: null,
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const authorSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSelectedPost: (state, action) => {
      return {
        ...state,
        setSelectedPost: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
        loaded: false,
      };
    });
    builder.addCase(init.rejected, (state) => {
      state.isLoading = false;
      state.errorMessage = 'Error';
    });
  },
});

export const { actions } = authorSlice;
export default authorSlice.reducer;
