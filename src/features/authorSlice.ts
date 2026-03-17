import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type AuthorState = {
  selectedAuthorId: number | null;
};
const initialState: AuthorState = { selectedAuthorId: null };
const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<number | null>) {
      // eslint-disable-next-line no-param-reassign
      state.selectedAuthorId = action.payload;
    },
    clearAuthor(state) {
      // eslint-disable-next-line no-param-reassign
      state.selectedAuthorId = null;
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
export const selectSelectedAuthorId = (state: RootState) =>
  state.author.selectedAuthorId;
export const selectSelectedAuthor = (state: RootState) =>
  state.author.selectedAuthorId !== null
    ? (state.users.items.find(u => u.id === state.author.selectedAuthorId) ??
      null)
    : null;
