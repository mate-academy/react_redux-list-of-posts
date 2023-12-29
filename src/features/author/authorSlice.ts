import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export const selectAuthor = (state: RootState) => state.author.author;

export default authorSlice.reducer;
