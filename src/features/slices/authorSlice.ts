import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  author: User | null
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User | null>) => {
      state.author = action.payload;
    },
  },
});

export const { actions } = authorSlice;
