import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialUser = null as User | null;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialUser,
  reducers: {
    set: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});
