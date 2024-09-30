import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorType = User | null;

const initialState: AuthorType = null satisfies AuthorType as AuthorType;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (_state, action: PayloadAction<User>) => action.payload,
  },
});

export const { setAuthor } = authorSlice.actions;
