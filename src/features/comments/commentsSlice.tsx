/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

export interface CommentsState {
  isLoading: boolean,
  hasError: boolean,
  comments: Comment[],
}

const initialState: CommentsState = {
  isLoading: false,
  hasError: false,
  comments: [],
};

export const fetchComments = createAsyncThunk(
  'fetch/comments',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'add/comment',
  (newComment: CommentData) => createComment(newComment),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending || addComment.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(fetchComments.rejected || addComment.rejected, state => {
      state.hasError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    });
  },
});

export const initDeleteComment = (commentId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(removeComment(commentId));

    await deleteComment(commentId);
  };
};

export default commentsSlice.reducer;
export const { removeComment } = commentsSlice.actions;
