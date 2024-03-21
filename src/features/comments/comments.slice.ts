/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadPostComments } from './actions';
import { Comment } from '../../types/Comment';

export interface CommentsState {
  comments: Comment[];
  isLoaded: boolean;
  hasError: boolean;
  submitting: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoaded: false,
  hasError: false,
  submitting: false,
};

const { actions, reducer } = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
    setError: state => {
      state.hasError = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPostComments.pending, state => {
        state.isLoaded = false;
      })
      .addCase(loadPostComments.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.comments = action.payload;
      })
      .addCase(loadPostComments.rejected, state => {
        state.isLoaded = true;
        state.hasError = true;
      });
  },
});

export { actions, reducer };
