import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../types/User';
import { getUsers } from '../api/users';

const initialState = {
  loaded: false,
  hasError: false,
  errorMessage: '',
  items: [] as User[],
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
        state.items.push(payload);
      }),
      removeUser: create.reducer((state, { payload }: PayloadAction<User>) => {
        return {
          ...state,
          items: state.items.filter(u => u.id !== payload.id),
        };
      }),
      clearUsers: create.reducer(() => {
        return { ...initialState };
      }),
      loadUsers: create.asyncThunk(
        () => {
          return getUsers();
        },
        {
          pending: state => {
            return {
              ...state,
              loaded: false,
              hasError: false,
              errorMessage: '',
            };
          },
          fulfilled: (state, { payload }) => {
            return { ...state, items: payload };
          },
          rejected: (state, { error, payload }) => {
            return {
              ...state,
              hasError: true,
              errorMessage: error.message ?? String(payload),
            };
          },
          settled: state => {
            return { ...state, loaded: true };
          },
        },
      ),
    };
  },
});
