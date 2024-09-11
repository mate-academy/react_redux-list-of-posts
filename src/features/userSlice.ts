import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UserSlice = {
  users: User[];
};

const initialState: UserSlice = {
  users: [],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;
