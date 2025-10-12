import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setCurrentUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setCurrentUser } = authorSlice.actions;
