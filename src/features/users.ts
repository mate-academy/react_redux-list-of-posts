import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState: User[] = [];

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<User[]>) => {
      return action.payload;
    },
  },
});

export const { set } = usersReducer.actions;
export default usersReducer.reducer;
