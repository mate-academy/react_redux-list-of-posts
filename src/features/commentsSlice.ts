import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from '../app/store';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      const currentState = state;

      currentState.comments = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      const currentState = state;

      currentState.hasError = action.payload;
    },
  },
});

export const { setComments, setLoading, setError } = commentsSlice.actions;

export const loadComments = (postId: number): AppThunk => async dispatch => {
  dispatch(setLoading(false));
  dispatch(setError(false));

  try {
    const comments = await commentsApi.getPostComments(postId);

    dispatch(setComments(comments));
  } catch (error) {
    dispatch(setError(true));
  } finally {
    dispatch(setLoading(true));
  }
};

export const CreateNewComment = (
  currentComments: Comment[],
  commentData: CommentData,
  postId: number,
): AppThunk => async dispatch => {
  try {
    const newComment = await commentsApi.createComment({
      ...commentData,
      postId,
    });

    dispatch(setComments([...currentComments, newComment]));
  } catch (error) {
    dispatch(setError(true));
  }
};

export const deleteComment = (
  currentComments: Comment[],
  commentId: number,
): AppThunk => async (dispatch) => {
  try {
    dispatch(setComments(
      currentComments.filter(
        comment => comment.id !== commentId,
      ),
    ));

    await commentsApi.deleteComment(commentId);
  } catch (error) {
    dispatch(setError(true));
  }
};

export default commentsSlice.reducer;
