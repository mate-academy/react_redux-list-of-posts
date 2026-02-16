import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UserSlice = {
  users: User[];
  error: boolean;
};

const initialState: UserSlice = {
  users: [],
  error: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
    setError: (state, action: PayloadAction<boolean>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser, setError } = userSlice.actions;
