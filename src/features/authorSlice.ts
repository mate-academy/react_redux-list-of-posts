import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorType = User | null;

export const authorSLice = createSlice({
  name: 'author',
  initialState: null as AuthorType,
  reducers: {
    setAuthor: (_, action: PayloadAction<AuthorType>) => action.payload,
  },
});
