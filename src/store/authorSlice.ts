import { User } from '../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorState = {
  author: User | null;
};

const initialState: AuthorState = {
  author: null,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, { payload }: PayloadAction<User>) {
      state.author = payload;
    },
  },
});

export default authorSlice.reducer;
