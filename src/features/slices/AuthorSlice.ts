/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type AuthorState = {
  selectedAuthor: User | null;
};

const initialState: AuthorState = {
  selectedAuthor: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedAuthor: (state, action: PayloadAction<User>) => {
      state.selectedAuthor = action.payload;
    },
    clearSelectedAuthor: state => {
      state.selectedAuthor = null;
    },
  },
});

export const { setSelectedAuthor, clearSelectedAuthor } = authorSlice.actions;
export default authorSlice.reducer;
