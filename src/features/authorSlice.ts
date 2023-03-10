import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

export interface AuthorState {
  selectedAuthor: User | null,
}

const initialState: AuthorState = {
  selectedAuthor: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectAuthor: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedAuthor = action.payload;
    },
  },
});

export const { selectAuthor } = authorSlice.actions;
export default authorSlice.reducer;
