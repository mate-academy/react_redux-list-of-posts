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
    setAuthor: (state, action) => {
      return {
        ...state,
        author: action.payload,
      };
    },
    clearAuthor: (state) => {
      return {
        ...state,
        author: null,
      };
    },
  },
});

export const { setAuthor, clearAuthor } = authorSlice.actions;
export default authorSlice.reducer;
