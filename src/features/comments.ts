import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

type State = {
  loaded: boolean,
  hasError: boolean,
  commentsList: Comment[],
  newCommentSubmiting: boolean,
};

const initialState: State = {
  loaded: true,
  hasError: false,
  commentsList: [],
  newCommentSubmiting: false,
};

export const fetchComments = createAsyncThunk(
  'fetchComments',
  (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const deleteComment = createAsyncThunk(
  'deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const createComment = createAsyncThunk(
  'createComment',
  (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

/* eslint-disable no-param-reassign */
const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state: State) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state: State) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(fetchComments.fulfilled, (state: State, action) => {
        state.commentsList = action.payload;
        state.loaded = true;
      })
      .addCase(deleteComment.fulfilled, (state: State, action) => {
        state.commentsList = state.commentsList
          .filter(comment => comment.id !== action.payload);
      })
      .addCase(createComment.pending, (state: State) => {
        state.newCommentSubmiting = true;
      })
      .addCase(createComment.fulfilled, (state: State, action) => {
        state.commentsList = [...state.commentsList, action.payload];
        state.newCommentSubmiting = false;
      });
  },
});

export default commentsSlice.reducer;
