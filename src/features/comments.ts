import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

const initialState = {
  loaded: false,
  hasError: '',
  items: [] as Comment[],
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const commentsSlice = createAppSlice({
  name: 'comments',
  initialState,
  reducers(create) {
    return {
      clearComments: create.reducer(state => {
        state.items = [];
      }),
      loadComments: create.asyncThunk(
        (postId: number) => {
          return getPostComments(postId);
        },
        {
          pending: state => {
            state.loaded = true;
          },
          fulfilled: (state, { payload }) => {
            state.items = payload;
          },
          rejected: (state, { error, payload }) => {
            state.hasError = error.message ?? String(payload);
          },
          settled: state => {
            state.loaded = false;
          },
        },
      ),
      addComment: create.asyncThunk(
        async (data: Omit<Comment, 'id'>) => {
          return createComment(data);
        },
        {
          pending: state => {
            state.loaded = true;
          },
          fulfilled: (state, { payload }) => {
            state.items.push(payload);
          },
          rejected: (state, { error, payload }) => {
            state.hasError = error.message ?? String(payload);
          },
          settled: state => {
            state.loaded = false;
          },
        },
      ),
      removeComment: create.asyncThunk(
        (commentId: number) => {
          return deleteComment(commentId);
        },
        {
          pending: state => {
            state.loaded = true;
          },
          fulfilled: (state, { meta }) => {
            state.items = state.items.filter(item => item.id !== meta.arg);
          },
          rejected: (state, { error, payload }) => {
            state.hasError = error.message ?? String(payload);
          },
          settled: state => {
            state.loaded = false;
          },
        },
      ),
    };
  },
});
