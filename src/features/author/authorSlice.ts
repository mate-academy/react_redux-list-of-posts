/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface Author {
  selectedAuthor: User | null,
}

const initialState: Author = {
  selectedAuthor: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedAuthor: (state, action: PayloadAction<User>) => {
      state.selectedAuthor = action.payload;
    },
  },
});

export const { setSelectedAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.selectedAuthor;

export default authorSlice.reducer;
