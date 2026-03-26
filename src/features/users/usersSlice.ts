/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface UsersState {
  items: User[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: UsersState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setItems, setLoaded, setHasError } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.items;
export const selectUsersLoading = (state: RootState) => !state.users.loaded;
export const selectUsersError = (state: RootState) => state.users.hasError;

export default usersSlice.reducer;
