/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentData } from '../types/Comment';

type NewCommentState = {
  newComment: CommentData;
};

const initialState: NewCommentState = {
  newComment: {
    name: '',
    email: '',
    body: '',
  },
};

const newCommentSlice = createSlice({
  name: 'newComment',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CommentData>) => {
      state.newComment = action.payload;
    },
  },
});

export default newCommentSlice.reducer;
export const { actions } = newCommentSlice;
