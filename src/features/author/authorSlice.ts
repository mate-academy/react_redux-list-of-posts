import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export type AuthorState = User | null;

export const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorState,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
