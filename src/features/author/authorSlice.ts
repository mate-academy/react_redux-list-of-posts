import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type Author = User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as Author,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
