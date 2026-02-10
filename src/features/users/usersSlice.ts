import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/User';

export interface Users {
  users: User[];
  user: User | null;
  error: string | null;
}

const initialState: Users = {
  users: [],
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    addError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload || 'Something went wrong',
      };
    },
  },
});

export const { addUsers, addError } = userSlice.actions;

export default userSlice.reducer;
