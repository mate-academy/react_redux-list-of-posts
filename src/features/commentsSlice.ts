/* eslint-disable no-param-reassign */
import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { SliceAcyncState } from '../types/SliceAcyncState';
import { RootState } from '../app/store';

type NewCommentStatus = 'idle' | 'loading' | 'error';

interface InitialState extends SliceAcyncState<Comment> {
  newCommentStatus: NewCommentStatus;
}

const initialState: InitialState = {
  loaded: false,
  hasError: false,
  newCommentStatus: 'idle' as NewCommentStatus,
  items: [],
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const commonAsyncHandlers = {
  pending: (state: SliceAcyncState<Comment>) => {
    state.loaded = false;
    state.hasError = false;
  },
  fulfilled: (
    state: SliceAcyncState<Comment>,
    { payload }: PayloadAction<Comment[]>,
  ) => {
    state.items = payload;
  },
  rejected: (state: SliceAcyncState<Comment>) => {
    state.hasError = true;
    state.items = [];
  },
  settled: (state: SliceAcyncState<Comment>) => {
    state.loaded = true;
  },
};

const comments = createAppSlice({
  name: 'comments',
  initialState,
  reducers(create) {
    return {
      set: create.reducer((state, { payload }: PayloadAction<Comment[]>) => {
        state.items = payload;
      }),
      delete: create.reducer((state, { payload }: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== payload);
      }),
      clear: create.reducer(state => {
        state.items = [];
      }),

      addAsyncComment: create.asyncThunk<Comment, CommentData, AppThunkAPI>(
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
        {
          pending: state => {
            state.newCommentStatus = 'loading';
          },
          fulfilled: (state, { payload }: PayloadAction<Comment>) => {
            state.newCommentStatus = 'idle';

            state.items.push(payload);
          },
          rejected: state => {
            state.newCommentStatus = 'error';
            state.hasError = true;
          },
        },
      ),

      deleteAsyncComment: create.asyncThunk<void, number, AppThunkAPI>(
        async (postId, { dispatch }) => {
          dispatch(comments.actions.delete(postId));
          commentsApi.deleteComment(postId);
        },
      ),

      loadComments: create.asyncThunk(async (postId: number) => {
        const posts = await commentsApi.getPostComments(postId);

        return posts;
      }, commonAsyncHandlers),
    };
  },
});

export const { set, clear, loadComments, addAsyncComment, deleteAsyncComment } =
  comments.actions;

export default comments.reducer;
