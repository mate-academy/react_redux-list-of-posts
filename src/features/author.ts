import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

const initialState = null as User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<User | null>) => action.payload,
  },
});

export default authorSlice.reducer;
export const { set: setAuthor } = authorSlice.actions;
