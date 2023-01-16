import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorStore = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorStore,
  reducers: {
    setAuthor: (_, action: PayloadAction<AuthorStore>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
