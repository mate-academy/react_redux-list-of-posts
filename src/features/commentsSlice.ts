import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from '../app/store';
import { getPostComments, createComment, deleteComment } from '../api/comments';

export interface CommentState {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComment(state, action: PayloadAction<Comment[]>) {
      const currentState = state;

      currentState.comments = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.isLoading = action.payload;
    },
    setHasError(state, action: PayloadAction<boolean>) {
      const currentState = state;

      currentState.hasError = action.payload;
    },
  },
});

export const { setComment, setIsLoading, setHasError } = commentsSlice.actions;

export const loadComments = (postId: number): AppThunk => async dispatch => {
  dispatch(setHasError(false));
  dispatch(setIsLoading(false));

  try {
    const comments = await getPostComments(postId);

    dispatch(setComment(comments));
  } catch {
    dispatch(setHasError(true));
  } finally {
    dispatch(setIsLoading(true));
  }
};

export const createNewComment = (
  currentComments: Comment[],
  commentData: CommentData,
  postId: number,
): AppThunk => async dispatch => {
  try {
    const newCommnet = await createComment({ ...commentData, postId });

    dispatch(setComment([...currentComments, newCommnet]));
  } catch {
    dispatch(setHasError(true));
  }
};

export const deleteOldComment = (
  currentComments: Comment[],
  commentId: number,
): AppThunk => async dispatch => {
  try {
    dispatch(setComment(currentComments
      .filter(comment => comment.id !== commentId)));

    await deleteComment(commentId);
  } catch {
    dispatch(setHasError(true));
  }
};

export default commentsSlice.reducer;
