/* eslint-disable no-param-reassign */
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  loadPostComments, deletePostComment, addPostComment,
} from './actions';

export interface CommentState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  submitting: boolean;
}

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
  submitting: false,
};

const { actions, reducer } = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPostComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
      state.comments = [];
    });
    builder.addCase(deletePostComment.pending, (state, action) => {
      const id = action.meta.arg;

      state.comments = state.comments
        .filter(item => item.id !== id);
    });
    builder.addCase(addPostComment.pending, (state) => {
      state.submitting = true;
      state.hasError = false;
    });
    builder.addMatcher(
      isAnyOf(
        loadPostComments.fulfilled,
        addPostComment.fulfilled,
      ),
      (state, action) => {
        state.loaded = true;
        state.submitting = false;
        state.comments = action.payload as Comment[];
      },
    );
    builder.addMatcher(
      isAnyOf(
        loadPostComments.rejected,
        addPostComment.rejected,
      ),
      (state) => {
        state.hasError = true;
        state.loaded = true;
        state.submitting = false;
      },
    );
  },
});

export { actions, reducer };
export default reducer;
