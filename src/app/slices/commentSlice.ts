/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
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
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  });

export const removeComment = createAsyncThunk('comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  });

export type CommentState = {
  loaded: boolean,
  hasError: boolean,
  loading: boolean,
  items: Comment[],
};

const initialState: CommentState = {
  loaded: false,
  hasError: false,
  loading: false,
  items: [],
};

export const commentSLice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state: CommentState, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },

    removeComment: (state: CommentState, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
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
        state: CommentState,
        action: PayloadAction<Comment[]>,
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
        state: CommentState,
        action: PayloadAction<Comment>,
      ) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(removeComment.fulfilled, (
        state: CommentState,
        action: PayloadAction<number>,
      ) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      });
  },
});
