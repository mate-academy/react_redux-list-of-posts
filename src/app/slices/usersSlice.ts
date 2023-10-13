/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/usersThunk';
import { User } from '../../types/User';

type UsersState = {
  users: User[],
  isLoading: boolean,
  hasError: boolean,
  author: User | null,
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  hasError: false,
  author: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          users: action.payload,
        };
      })
      .addCase(fetchUsers.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      });
  },
});

export const usersReducer = userSlice.reducer;

export const usersActions = userSlice.actions;
