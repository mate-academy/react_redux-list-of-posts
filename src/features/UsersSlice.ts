/* eslint-disable no-param-reassign */
import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

type UsersStateType = {
  loading: boolean;
  error: boolean;
  users: User[];
};

const empty: UsersStateType = {
  loading: false,
  error: false,
  users: [],
};

export const customCreateSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const usersSlice = customCreateSlice({
  name: 'users',
  initialState: empty,
  reducers(create) {
    return {
      loadUsers: create.asyncThunk(
        async () => {
          return getUsers();
        },
        {
          pending: state => {
            state.loading = true;
            state.error = false;
          },
          rejected: state => {
            state.error = true;
          },
          fulfilled: (state, { payload }: PayloadAction<User[]>) => {
            state.users = payload;
          },
          settled: state => {
            state.loading = false;
          },
        },
      ),
    };
  },
});
