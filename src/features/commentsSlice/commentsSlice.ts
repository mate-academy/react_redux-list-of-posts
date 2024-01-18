import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { thunks } from './thunks';
import {
  setError,
  startLoading,
  localeAddComment,
  setComments,
  clearComments,
} from './helper';
import { actions as selectedPostActions } from '../selectedPostSlice';
import { actions } from '../authorSlice';

const { addComment, removeComment, loadComments } = thunks;

export type CommentsState = {
  comments: Comment[],
  loading: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    localeRemoveComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(selectedPostActions.set, clearComments);
    builder.addCase(actions.set, clearComments);

    builder.addCase(loadComments.pending, startLoading);
    builder.addCase(loadComments.fulfilled, setComments);
    builder.addCase(loadComments.rejected, setError);

    builder.addCase(addComment.fulfilled, localeAddComment);
    builder.addCase(addComment.rejected, setError);

    builder.addCase(removeComment.rejected, setError);
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = {
  ...thunks,
  ...commentsSlice.actions,
};
