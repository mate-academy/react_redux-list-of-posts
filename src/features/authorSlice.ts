import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { User } from '../types/User';

type Author = User | null;

const authorSlice = createSlice<Author, SliceCaseReducers<Author>, string>({
  name: 'author',
  initialState: null,
  reducers: {
    setAuthor: (_, action: PayloadAction<Author>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
