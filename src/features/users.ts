import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  loading: false,
  users: [] as User[],
  error: '',
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const usersSlice = createAppSlice({
  name: 'users',
  initialState,
  reducers(create) {
    return {
      addUser: create.reducer((state, { payload }: PayloadAction<User>) => {
        state.users.push(payload);
      }),
      removeUser: create.reducer((state, { payload }: PayloadAction<User>) => {
        state.users = state.users.filter(user => user !== payload);
      }),
      clearUsers: create.reducer(state => {
        state.users = [];
      }),
      loadUsers: create.asyncThunk(
        () => {
          return getUsers();
        },
        {
          pending: state => {
            state.loading = true;
          },
          fulfilled: (state, { payload }) => {
            state.users = payload;
          },
          rejected: (state, { error, payload }) => {
            state.error = error.message ?? String(payload);
          },
          settled: state => {
            state.loading = false;
          },
        },
      ),
    };
  },
});
