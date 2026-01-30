/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { SliceAcyncState } from '../types/SliceAcyncState';
import { type RootState } from '../app/store';

type NewCommentStatus = 'idle' | 'loading' | 'error';

export interface CommentsState extends SliceAcyncState<Comment> {
  newCommentStatus: NewCommentStatus;
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  newCommentStatus: 'idle' as NewCommentStatus,
  items: [] as Comment[],
};

export const addAsyncComment = createAsyncThunk<Comment, CommentData>(
  'comments/addAsyncComment',
  async (commentData, { getState }) => {
    const state = getState() as RootState;
    const postId = state.selectedPost?.id;

    if (postId === undefined) {
      throw new Error('Selected post id is null!');
    }

    const { name, email, body } = commentData;
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deleteAsyncComment = createAsyncThunk<void, number>(
  'comments/deleteAsyncComment',
  async (commentId, { dispatch }) => {
    // eslint-disable-next-line
    dispatch(comments.actions.delete(commentId));
    commentsApi.deleteComment(commentId);
  },
);

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const posts = await commentsApi.getPostComments(postId);

    return posts;
  },
);

export const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set(state, { payload }: PayloadAction<Comment[]>) {
      state.items = payload;
    },
    delete(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== payload);
    },
    clear(state) {
      state.items = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAsyncComment.pending, state => {
        state.newCommentStatus = 'loading';
        state.hasError = false;
      })
      .addCase(
        addAsyncComment.fulfilled,
        (state, { payload }: PayloadAction<Comment>) => {
          state.newCommentStatus = 'idle';

          state.items.push(payload);
        },
      )
      .addCase(addAsyncComment.rejected, state => {
        state.newCommentStatus = 'error';
        state.hasError = true;
      });

    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        loadComments.fulfilled,
        (state, { payload }: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = payload;
        },
      )
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.items = [];
      });

    builder.addCase(deleteAsyncComment.rejected, state => {
      state.hasError = true;
    });
  },
});

export const { set, clear } = comments.actions;

export default comments.reducer;
