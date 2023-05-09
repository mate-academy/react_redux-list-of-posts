/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

export interface CommentState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addComments',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(commentsAsync.pending, (state) => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(commentsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload;
      })
      .addCase(commentsAsync.rejected, (state) => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line max-len
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
