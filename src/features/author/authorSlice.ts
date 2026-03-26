/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthorState {
  authorId: number | null;
}

const initialState: AuthorState = {
  authorId: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthorId: (state, action: PayloadAction<number | null>) => {
      state.authorId = action.payload;
    },
  },
});

export const { setAuthorId } = authorSlice.actions;
export const selectAuthorId = (state: RootState) => state.author.authorId;
export default authorSlice.reducer;
