/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentsApi from '../../api/comments';

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

export const incrementComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: number) => {
    const response = await getPostComments(postId);

    return response;
  },
);

export const removeComment = createAsyncThunk(
  'comment/removeComment',
  async (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (comment: Comment) => {
    return commentsApi.createComment(comment);
  },
);

export const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state: CommentsState, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    setError: (state: CommentsState, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(incrementComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(incrementComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
      })
      .addCase(incrementComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(createComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items.push(action.payload);
      })
      .addCase(createComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(removeComment.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(removeComment.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setComments, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
