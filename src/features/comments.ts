import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

const initialState = {
  loaded: false,
  hasError: false,
  errorMessage: '',
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
      clearComments: create.reducer(() => {
        return { ...initialState };
      }),
      loadComments: create.asyncThunk(
        (postId: number) => {
          return getPostComments(postId);
        },
        {
          pending: state => {
            return {
              ...state,
              loaded: false,
              hasError: false,
              errorMessage: '',
            };
          },
          fulfilled: (state, { payload }) => {
            return { ...state, items: payload };
          },
          rejected: (state, { error, payload }) => {
            return {
              ...state,
              hasError: true,
              errorMessage: error.message ?? String(payload),
            };
          },
          settled: state => {
            return { ...state, loaded: true };
          },
        },
      ),
      addComment: create.asyncThunk(
        async (data: Omit<Comment, 'id'>) => {
          return createComment(data);
        },
        {
          pending: state => {
            return {
              ...state,
              loaded: false,
              hasError: false,
              errorMessage: '',
            };
          },
          fulfilled: (state, { payload }) => {
            state.items.push(payload);
          },
          rejected: (state, { error, payload }) => {
            return {
              ...state,
              hasError: true,
              errorMessage: error.message ?? String(payload),
            };
          },
          settled: state => {
            return { ...state, loaded: true };
          },
        },
      ),
      removeComment: create.asyncThunk(
        (commentId: number) => {
          return deleteComment(commentId);
        },
        {
          pending: state => {
            return {
              ...state,
              loaded: false,
              hasError: false,
              errorMessage: '',
            };
          },
          fulfilled: (state, { meta }) => {
            return {
              ...state,
              items: state.items.filter(item => item.id !== meta.arg),
            };
          },
          rejected: (state, { error, payload }) => {
            return {
              ...state,
              hasError: true,
              errorMessage: error.message ?? String(payload),
            };
          },
          settled: state => {
            return { ...state, loaded: true };
          },
        },
      ),
    };
  },
});
