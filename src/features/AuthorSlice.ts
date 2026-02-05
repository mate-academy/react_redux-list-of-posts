/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { customCreateSlice } from './UsersSlice';

type InitialStateType = {
  user: User | null;
};

const initialState = {
  user: null,
};

export const authorSlice = customCreateSlice({
  name: 'author',
  initialState: initialState as InitialStateType,
  reducers(create) {
    return {
      set: create.reducer((state, { payload }: PayloadAction<User | null>) => {
        state.user = payload;
      }),
    };
  },
});
