/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });

    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addNewComment.rejected, state => {
        state.hasError = true;
      });

    builder
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
