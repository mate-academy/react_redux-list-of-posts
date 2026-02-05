/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { customCreateSlice } from './UsersSlice';
import * as commentsApi from '../api/comments';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SimplifiedComment = Optional<Comment, 'id'>;

type CommentsState = {
  items: SimplifiedComment[];
  loaded: boolean;
  hasError: string;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const commentsSlice = customCreateSlice({
  name: 'comments',
  initialState,
  reducers(create) {
    return {
      loadComments: create.asyncThunk(
        async (postId: number) => {
          return getPostComments(postId);
        },
        {
          pending: state => {
            state.loaded = true;
            state.hasError = '';
          },
          rejected: state => {
            state.hasError = 'Something went wrong';
          },
          fulfilled: (state, { payload }: PayloadAction<Comment[]>) => {
            state.items = payload;
          },
          settled: state => {
            state.loaded = false;
          },
        },
      ),

      add: create.reducer(
        (state, { payload }: PayloadAction<SimplifiedComment>) => {
          state.items.push(payload);
        },
      ),

      addToServer: create.asyncThunk(
        async (comment: SimplifiedComment) => {
          return commentsApi.createComment(comment);
        },
        {
          fulfilled: (state, { payload }: PayloadAction<Comment>) => {
            const idx = state.items.findIndex(comment => !comment.id);

            if (idx) {
              state.items[idx] = payload;
            }
          },
        },
      ),

      delete: create.reducer((state, { payload }: PayloadAction<number>) => {
        state.items = state.items.filter(comment => comment.id !== payload);
      }),

      deleteFromServer: create.asyncThunk(async (commentId: number) => {
        return commentsApi.deleteComment(commentId);
      }),
    };
  },
});
