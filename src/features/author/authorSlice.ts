import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import type { RootState } from '../../app/store';

type AuthorState = User | null;

const initialState: AuthorState = null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialState as AuthorState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author;

export default authorSlice.reducer;
