import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';

type UserState = {
  author: User | null;
};

const initialState: UserState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<User | null>) => {
      state.author = payload;
    },
  },
});

export const { reducer, actions } = authorSlice;
