import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

export interface AuthorState {
  selectedAuthor: User | null;
}

const initialState: AuthorState = {
  selectedAuthor: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSelectedAuthor: (state, action: { payload: User | null }) => ({
      ...state,
      selectedAuthor: action.payload,
    }),
  },
});

export const { setSelectedAuthor } = authorSlice.actions;

export const selectSelectedAuthor = (state: RootState) =>
  state.author.selectedAuthor;

export default authorSlice.reducer;
