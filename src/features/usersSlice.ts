import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import type { RootState } from '../app/store';

export type UsersState = {
  users: User[],
  usersIsLoading: boolean,
  usersIsError: boolean,
  selectedUserId: number | null,
};

const initialState: UsersState = {
  users: [],
  usersIsLoading: false,
  usersIsError: true,
  selectedUserId: null,
};

export const userSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setUsers: (state, action:PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setUsersIsLoading: (state, action:PayloadAction<boolean>) => {
      state.usersIsLoading = action.payload;
    },
    setUsersError: (state, action:PayloadAction<boolean>) => {
      state.usersIsError = action.payload;
    },
    setSelectedUserId: (state, action:PayloadAction<number | null>) => {
      state.selectedUserId = action.payload;
    },
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectCurrentUser = (state: RootState) => {
  const { users } = state.users;
  const userId = state.users.selectedUserId;

  return users.find(user => user.id === userId);
};

export const {
  setUsers,
  setUsersIsLoading,
  setUsersError,
  setSelectedUserId,
} = userSlice.actions;

export default userSlice.reducer;
