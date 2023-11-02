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
  },
});

export const authorReducer = authorSlice.reducer;
export const authorActions = authorSlice.actions;
