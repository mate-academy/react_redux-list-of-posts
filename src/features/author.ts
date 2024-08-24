import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    set: (_, action: PayloadAction<User>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { set } = authorSlice.actions;
