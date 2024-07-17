import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorType = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorType,
  reducers: {
    setAuthor: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
