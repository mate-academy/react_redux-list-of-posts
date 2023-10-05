/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk('comments/fetchComments',
  async (postId: number) => {
    const fetchedComments = await getPostComments(postId);

    return fetchedComments;
  });

export const createNewComment = createAsyncThunk('comments/createComment',
  async (data : Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  });

export const removeComment = createAsyncThunk('comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  loading: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  loading: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentsState, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeComment: (state: CommentsState, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    },
    clearComments: (state: CommentsState) => {
      state.items = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state: CommentsState) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment[]>) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state: CommentsState) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createNewComment.pending, (state: CommentsState) => {
        state.loading = true;
      })
      .addCase(createNewComment.fulfilled, (state: CommentsState,
        action: PayloadAction<Comment>) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(removeComment.fulfilled, (state: CommentsState,
        action: PayloadAction<number>) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      });
  },
});
