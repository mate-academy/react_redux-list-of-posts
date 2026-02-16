import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UsersState = {
  users: User[];
};

const initialUsers: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});
