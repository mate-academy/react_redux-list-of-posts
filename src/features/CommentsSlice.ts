/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as commentsApi from '../api/comments';
import { AppThunk } from '../app/store';
import { Comment, CommentData } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
  visible: false,
};

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      return {
        ...state,
        comments: action.payload,
      };
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        loaded: action.payload,
      };
    },
    setHasError(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    setVisible(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        visible: action.payload,
      };
    },
  },
});

export const { setComments, setLoaded, setHasError, setVisible } =
  CommentsSlice.actions;
export default CommentsSlice.reducer;

export const loadComments = (postId: number): AppThunk => dispatch => {
  dispatch(setLoaded(false));
  dispatch(setHasError(false));
  dispatch(setVisible(false));

  commentsApi
    .getPostComments(postId)
    .then(data => {
      dispatch(setComments(data));
    })
    .catch(() => {
      dispatch(setHasError(true));
    })
    .finally(() => {
      dispatch(setLoaded(true));
    });
};

export const addComment =
  (commentData: CommentData, postId: number): AppThunk =>
    (dispatch, getState) => {
      commentsApi
        .createComment({ ...commentData, postId })
        .then((newComment) => {
          const currentComments = getState().comments.comments;

          dispatch(setComments([...currentComments, newComment]));
        })
        .catch(() => {
          dispatch(setHasError(true));
        });
    };

export const deleteComment =
  (commentId: number): AppThunk =>
    (dispatch, getState) => {
      const currentComments = getState().comments.comments;

      dispatch(setComments(currentComments.filter((c) => c.id !== commentId)));

      commentsApi.deleteComment(commentId).catch(() => {
        dispatch(setHasError(true));
      });
    };
