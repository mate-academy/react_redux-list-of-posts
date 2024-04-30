import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';

const usersSlice = createSlice<User[], SliceCaseReducers<User[]>, string>({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (_, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
