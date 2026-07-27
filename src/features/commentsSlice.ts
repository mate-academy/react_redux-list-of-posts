import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

export type CommentsState = {
  items: Comment[];
  hasError: boolean;
  loaded: boolean;
};

const initialState: CommentsState = {
  items: [],
  hasError: false,
  loaded: false,
};

export const loadPostComments = createAsyncThunk(
  'comments/loadPostComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

type CommentData = {
  name: string;
  email: string;
  body: string;
};

type AddCommentParams = {
  postId: number;
  comment: CommentData;
};

export const addPostComment = createAsyncThunk(
  'comments/addPostComment',
  async ({ postId, comment }: AddCommentParams) => {
    return commentsApi.createComment({
      ...comment,
      postId,
    });
  },
);

export const deletePostComment = createAsyncThunk(
  'comments/deletePostComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },

    clearItems: state => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPostComments.pending, state => {
      return {
        ...state,
        loaded: false,
      };
    });

    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });

    builder.addCase(loadPostComments.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });

    builder.addCase(addPostComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addPostComment.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });

    builder.addCase(deletePostComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    });
  },
});
