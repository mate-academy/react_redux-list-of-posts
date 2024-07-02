import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type UserState = User[];

const userState: UserState = [];

const userSlice = createSlice({
  name: 'users',
  initialState: userState,
  reducers: {
    fillUsers: (_, action: PayloadAction<User[]>) => action.payload,
  },
});

export const { fillUsers } = userSlice.actions;
export default userSlice.reducer;
