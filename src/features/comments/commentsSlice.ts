import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';

import type { Post } from '../../types/Post';
import type { Comment, CommentData } from '../../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number): Promise<Comment[]> => commentsApi.getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (commentData: CommentData & Pick<Post, 'id'>): Promise<Comment> => {
    const {
      name, email, body, id: postId,
    } = commentData;

    return commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: Comment['id']): Promise<Comment['id']> => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];// eslint-disable-line no-param-reassign
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.loaded = false;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.items = action.payload;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.hasError = true;// eslint-disable-line no-param-reassign
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.loaded = false;// eslint-disable-line no-param-reassign
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.items.push(action.payload);// eslint-disable-line no-param-reassign
      })
      .addCase(addComment.rejected, (state) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.hasError = true;// eslint-disable-line no-param-reassign
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.loaded = false;// eslint-disable-line no-param-reassign
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.items = state.items.filter(item => item.id !== action.payload);// eslint-disable-line no-param-reassign
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loaded = true;// eslint-disable-line no-param-reassign
        state.hasError = true;// eslint-disable-line no-param-reassign
      });
  },
});

// export const { } = commentsSlice.actions;
export default commentsSlice.reducer;
