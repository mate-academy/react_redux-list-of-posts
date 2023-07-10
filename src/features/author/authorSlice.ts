import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = User | null;

const authorSlice = createSlice({
  name: 'author',
  initialState: null as AuthorState,
  reducers: {
    setAuthor: (__, action: PayloadAction<User>) => {
      const newState = action.payload;

      return newState;
    },
  },
});

export const authorRecuder = authorSlice.reducer;

export const { actions } = authorSlice;
