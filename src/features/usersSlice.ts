import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => ({
      ...state,
      users: action.payload,
    }),
  },
});

export const { set } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
