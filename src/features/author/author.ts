import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

const initialState: User | null = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as User | null,
  reducers: {
    set(_, action: PayloadAction<User>) {
      return action.payload;
    },
    clear() {
      return null;
    },
  },
});

export default authorSlice.reducer;
export const { set, clear } = authorSlice.actions;
