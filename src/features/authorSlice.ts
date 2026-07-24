import { User } from '../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorState = User | null;

const initialState = null as AuthorState;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
