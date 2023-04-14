import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export interface Author {
  selectedAuthor: User | null;
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

export default authorSlice.reducer;
export const { setSelectedAuthor } = authorSlice.actions;
export const selectAuthor = (state: RootState) => state.author.selectedAuthor;
