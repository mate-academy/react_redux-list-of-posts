/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsType = {
  items: [],
  loaded: false,
  hasError: false,
};

// const loadComments = createAsyncThunk(
//   'comments/fetchComments',
//   async (postId: number) => {
//     await getPostComments(postId);
//   },
// );

export const loadComments = createAsyncThunk(
  'comments/fetchComment',
  async (postId: number) => {
    const value = await getPostComments(postId);

    return value;
  },
);

// const addComment = createAsyncThunk(
//   'comments/addComment',
//   async (comment: Omit<Comment, 'id'>) => {
//     createComment(comment);
//   },
// );

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const value = await createComment(comment);

    return value;
  },
);

// const delateComment = createAsyncThunk(
//   'comments/delateComments',
//   async (commentId: number) => {
//     deleteComment(commentId);
//   },
// );

export const delateComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(loadComments.rejected, state => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addComment.rejected, state => {
      state.hasError = true;
    });

    builder
      .addCase(delateComment.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(delateComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
