import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type AuthorState = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User>) => action.payload,
    clearAuthor: () => null,
  },
});

export default authorSlice.reducer;

export const { setAuthor, clearAuthor } = authorSlice.actions;
