import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setAuthor: (state, action: PayloadAction<User | null>) => ({
      ...state,
      author: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        users: action.payload,
      }))
      .addCase(fetchUser.rejected, (state) => (
        { ...state, isLoading: false, hasError: true }));
  },
});

export const userAction = userSlice.actions;
export const usersReducer = userSlice.reducer;
