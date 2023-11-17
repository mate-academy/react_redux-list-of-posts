import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface Author {
  user: User | null;
}

const initialState: Author = {
  user: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      if (state) {
        // eslint-disable-next-line no-param-reassign
        state.user = action.payload;
      }
    },
  },
});

export const { setAuthor } = authorSlice.actions;
