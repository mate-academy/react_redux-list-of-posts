import {
  PayloadAction,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';

type Author = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as Author,
  reducers: {
    setAuthor: (_, action: PayloadAction<Author>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
