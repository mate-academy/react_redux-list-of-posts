/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment, deleteComment, getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const createNewComment = createAsyncThunk('comments/createComment',
  async (data : Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  });

export const removeCommentApi = createAsyncThunk('comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

export interface CommentState {
  loaded: boolean,
  hasError: boolean,
  loading: boolean,
  items: Comment[],
}

const initialState: CommentState = {
  loaded: false,
  hasError: false,
  loading: false,
  items: [],
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentState, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state: CommentState, action: PayloadAction<number>) => {
      state.items.filter(item => item.id !== action.payload);
    },
    clearComments: (state: CommentState) => {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state: CommentState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (
        state: CommentState, action: PayloadAction<Comment[]>,
      ) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createNewComment.pending, (state: CommentState) => {
        state.loading = true;
      })
      .addCase(createNewComment.fulfilled, (
        state: CommentState, action: PayloadAction<Comment>,
      ) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(removeCommentApi.fulfilled, (
        state: CommentState, action: PayloadAction<number>,
      ) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { removeComment } = commentSlice.actions;
