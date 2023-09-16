import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../types/User';
import type { RootState } from '../app/store';

const initialUsers: User[] = [];

const userSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {
    set: (state, action: PayloadAction<User[]>) => {
      return action.payload || state;
    },
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
export const usersApi = (state: RootState) => state.users;
