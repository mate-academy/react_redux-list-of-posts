import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | null,
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    addAuthor: (
      state, action: PayloadAction<User | null>,
    ) => {
      return {
        ...state,
        author: action.payload,
      };
    },
  },
});

export const { addAuthor } = authorSlice.actions;
export default authorSlice.reducer;
