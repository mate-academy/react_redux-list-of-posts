import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorState = {
  userId: number | null;
};

const initialState: AuthorState = {
  userId: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<number | null>) {
      state.userId = action.payload;
    },
  },
});

export const { setAuthor } = authorSlice.actions;
export default authorSlice.reducer;

export const selectAuthorId = (s: { author: AuthorState }) => s.author.userId;
