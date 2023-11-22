/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUser } from '../thunks/userThunk';

export type UserState = {
  users: User[];
  isLoaded: boolean;
  hasError:boolean;
  author: User | null;
};

const initialState: UserState = {
  users: [],
  isLoaded: false,
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
      .addCase(fetchUser.pending, (state) => {
        return {
          ...state,
          isLoaded: true,
        };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoaded: false,
          users: action.payload,
        };
      })
      .addCase(fetchUser.rejected, (state) => {
        return {
          ...state,
          isLoaded: false,
          hasError: true,
        };
      });
  },
});

export const userAction = userSlice.actions;
export const usersReducer = userSlice.reducer;
