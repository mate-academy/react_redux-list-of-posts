import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type Author = User | null;

const initialState = null as Author;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<Author>) => action.payload,
    remove: () => null,
  },
});

export default authorSlice.reducer;
export const { actions } = authorSlice;
