import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { RootState } from '../app/store';

interface AuthorState {
  selectedAuthor: User | null;
}

const initialState: AuthorState = {
  selectedAuthor: null,
};

/* eslint-disable no-param-reassign */
export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      state.selectedAuthor = action.payload;
    },
  },
});

export default authorSlice.reducer;
export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.selectedAuthor;
