import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { User } from '../types/User';

export interface AuthorState {
  author: User | null;
}

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state: AuthorState, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const selectAuthor = (state: RootState) => state.author.author;

export default authorSlice.reducer;
export const { actions } = authorSlice;
