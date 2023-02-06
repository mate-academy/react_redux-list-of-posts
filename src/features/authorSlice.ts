import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as AuthorState,
  reducers: {
    select: (_value, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { select } = authorSlice.actions;
