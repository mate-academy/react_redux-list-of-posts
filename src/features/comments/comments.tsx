import { createSlice } from '@reduxjs/toolkit';
import { PostComment } from '../../types/PostComment';
import { loadPostComments } from './thunks/loadCommentsThunk';
import { deletePostComment } from './thunks/deleteComment';
import { createPostComment } from './thunks/createComment';

type CommentsState = {
  value: PostComment[];
  loadStatus: 'idle' | 'loading' | 'loaded' | 'failed';
  deleteStatus: 'idle' | 'deleting' | 'failed';
  createStatus: 'idle' | 'creating' | 'failed';
};

const initialState: CommentsState = {
  value: [],
  loadStatus: 'idle',
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
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.loadStatus = 'loading';
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.loadStatus = 'loaded';
        state.value = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.loadStatus = 'failed';
      })
      .addCase(deletePostComment.pending, state => {
        state.deleteStatus = 'deleting';
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
        state.deleteStatus = 'idle';
        state.value = state.value.filter(
          comment => comment.id !== action.payload,
        );
      })
      .addCase(createPostComment.pending, state => {
        state.createStatus = 'creating';
      })
      .addCase(createPostComment.fulfilled, (state, action) => {
        state.createStatus = 'idle';
        state.value.push(action.payload);
      })
      .addCase(createPostComment.rejected, state => {
        state.createStatus = 'failed';
      });
  },
});

export default commentsSlice.reducer;
export const { resetCommentCreateStatus } = commentsSlice.actions;
