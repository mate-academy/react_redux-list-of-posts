import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type Author = User | null;

const initialState = null as Author;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    addAuthor: (_, action: PayloadAction<Author>) => {
      return action.payload;
    },
  },
});

export const { addAuthor } = authorSlice.actions;

export default authorSlice.reducer;
