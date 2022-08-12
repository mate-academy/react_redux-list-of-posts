/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';

interface CommentsSlice {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsSlice = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsLoading(state) {
      state.loaded = false;
    },

    commentsLoadingSuccess(state, action: PayloadAction<Comment[]>) {
      state.loaded = true;
      state.hasError = false;
      state.comments = action.payload;
    },

    commentsLoadingFail(state) {
      state.loaded = true;
      state.hasError = true;
    },

    commentDelete(state, action: PayloadAction<number>) {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
});

export const {
  commentsLoading,
  commentsLoadingFail,
  commentsLoadingSuccess,
  commentDelete,
} = commentSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default commentSlice.reducer;
