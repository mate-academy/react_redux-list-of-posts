import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export interface AuthorState {
  selectedAuthor: User | null;
}

const initialState: AuthorState = {
  selectedAuthor: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    selectAuthor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.selectedAuthor = action.payload;
    },
    clearSelectedAuthor: state => {
      // eslint-disable-next-line no-param-reassign
      state.selectedAuthor = null;
    },
  },
});

export const { selectAuthor, clearSelectedAuthor } = authorSlice.actions;

export default authorSlice.reducer;
