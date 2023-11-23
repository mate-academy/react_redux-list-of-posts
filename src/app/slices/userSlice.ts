import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUser } from '../thunks/userThunk';

export type UserState = {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
  author: User | null;
};

const initialState: UserState = {
  users: [],
  isLoading: true,
  hasError: false,
  author: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }).addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    }).addCase(fetchUser.rejected, (state) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    });
  },
});

export const userAction = userSlice.actions;
export const usersReducer = userSlice.reducer;
