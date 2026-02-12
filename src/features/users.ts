/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface SetUsersPayload {
  users: User[];
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (_, action: PayloadAction<SetUsersPayload>) => {
      const {
        payload: { users },
      } = action;

      return users;
    },
  },
});

const {
  actions: { setUsers },
} = usersSlice;

export { setUsers };
