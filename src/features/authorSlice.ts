import { User } from '../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = null as User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(_state, action: PayloadAction<User | null>) {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
