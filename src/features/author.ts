import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.author = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;
