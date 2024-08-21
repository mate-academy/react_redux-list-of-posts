import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User[] = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (users, action: PayloadAction<User[]>) => [
      ...users,
      ...action.payload,
    ],
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;
