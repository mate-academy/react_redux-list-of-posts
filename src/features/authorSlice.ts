import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as User | null,
  reducers: {
    setAuthor(_, action: PayloadAction<User | null>) {
      return action.payload;
    },

    resetAuthor: () => null,
  },
});

export const { setAuthor, resetAuthor } = authorSlice.actions;
export default authorSlice.reducer;
