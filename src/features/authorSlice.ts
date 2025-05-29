import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

type AuthorState = {
  author: User | undefined;
};

const initialState: AuthorState = {
  author: undefined,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return { ...state, author: action.payload };
    },
  },
});

export const { actions } = authorSlice;
export default authorSlice.reducer;
