import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

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
export const { set } = userSlice.actions;
export const usersFromServer = (state: RootState) => state.users;
