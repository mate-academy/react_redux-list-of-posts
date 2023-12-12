import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null;
};

const authorState: AuthorState = {
  author: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState: authorState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
});

export const { setAuthor } = authorSlice.actions;

export default authorSlice.reducer;
