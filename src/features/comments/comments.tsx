import { createSlice } from '@reduxjs/toolkit';
import { PostComment } from '../../types/PostComment';
import { loadPostComments } from './thunks/loadCommentsThunk';
import { deletePostComment } from './thunks/deleteComment';
import { createPostComment } from './thunks/createComment';

type CommentsState = {
  items: PostComment[];
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  deleteStatus: 'idle' | 'deleting' | 'failed';
  createStatus: 'idle' | 'creating' | 'failed';
};

const initialState: CommentsState = {
  items: [],
  loading: false,
  loaded: false,
  hasError: false,
  deleteStatus: 'idle',
  createStatus: 'idle',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetCommentCreateStatus: state => {
      /* eslint-disable no-param-reassign */
      state.createStatus = 'idle';
    },
    resetCommentDeleteStatus: state => {
      /* eslint-disable no-param-reassign */
      state.deleteStatus = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loading = true;
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.loading = false;
        state.loaded = false;
        state.hasError = true;
      })
      .addCase(deletePostComment.pending, state => {
        state.deleteStatus = 'deleting';
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.deleteStatus = 'idle';
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(deletePostComment.rejected, state => {
        state.deleteStatus = 'failed';
      })
      .addCase(createPostComment.pending, state => {
        state.createStatus = 'creating';
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.createStatus = 'idle';
        state.items.push(action.payload);
      })
      .addCase(createPostComment.rejected, state => {
        state.createStatus = 'failed';
      });
  },
});

export default commentsSlice.reducer;
export const { resetCommentCreateStatus, resetCommentDeleteStatus } =
  commentsSlice.actions;
