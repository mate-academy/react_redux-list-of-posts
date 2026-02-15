import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false as boolean;

export const newCommentSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setNewComment: (_, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default newCommentSlice.reducer;
export const { actions } = newCommentSlice;
