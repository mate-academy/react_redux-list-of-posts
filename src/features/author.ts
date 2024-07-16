import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AutorState = {
  author: User | null;
};

const initialAuthor: AutorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState: initialAuthor,
  reducers: {
    set: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
});

export const { set } = authorSlice.actions;

export default authorSlice.reducer;
