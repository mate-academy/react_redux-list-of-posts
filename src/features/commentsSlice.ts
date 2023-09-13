/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

const initialState = {
  comments: [] as Comment[],
  isError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (comments, action: PayloadAction<Comment[]>) => {
      comments.comments = action.payload;
    },
    setErrors: (comments, action: PayloadAction<boolean>) => {
      comments.isError = action.payload;
    },
  },
});

export default commentsSlice.reducer;
export const { actions } = commentsSlice;
