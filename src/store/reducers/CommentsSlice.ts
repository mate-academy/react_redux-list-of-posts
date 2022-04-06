/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { fetchCommentsByPostId, removeCommentById, addComment } from './ActionCreators';

export interface CommentState {
  comments: PostComment[];
  areCommentsLoading: boolean;
  errorLoadingComments: string;
  areCommentVisible: boolean;
}

const initialState: CommentState = {
  comments: [],
  areCommentsLoading: false,
  errorLoadingComments: '',
  areCommentVisible: true,
};

export const commentSlice: Slice<CommentState> = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentVisible(state, action: PayloadAction<boolean>) {
      state.areCommentVisible = action.payload;
    },
  },
  extraReducers: {
    [fetchCommentsByPostId.pending.type]: (state) => {
      state.areCommentsLoading = true;
    },
    [fetchCommentsByPostId.fulfilled.type]: (state, action: PayloadAction<PostComment[]>) => {
      state.areCommentsLoading = false;
      state.errorLoadingComments = '';
      state.comments = action.payload;
    },
    [fetchCommentsByPostId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.areCommentsLoading = false;
      state.errorLoadingComments = action.payload;
    },

    [removeCommentById.pending.type]: (state) => {
      state.areCommentsLoading = true;
    },
    [removeCommentById.fulfilled.type]: (state) => {
      state.areCommentsLoading = false;
      state.errorLoadingComments = '';
    },
    [removeCommentById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.areCommentsLoading = false;
      state.errorLoadingComments = action.payload;
    },

    [addComment.pending.type]: (state) => {
      state.areCommentsLoading = true;
    },
    [addComment.fulfilled.type]: (state) => {
      state.areCommentsLoading = false;
      state.errorLoadingComments = '';
    },
    [addComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.areCommentsLoading = false;
      state.errorLoadingComments = action.payload;
    },
  },
});

export default commentSlice.reducer;
