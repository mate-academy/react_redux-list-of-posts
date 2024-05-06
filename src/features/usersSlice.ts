import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
  },
});

export const { reducer, actions } = usersSlice;
