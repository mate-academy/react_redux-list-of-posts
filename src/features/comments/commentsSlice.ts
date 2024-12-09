/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';
import { RootState } from '../../app/store';

export const loadComments = createAsyncThunk(
  'comments/fetchComments',
  (postID: number) => {
    return commentsApi.getPostComments(postID);
  },
);

const initialState = {
  comments: [] as Comment[],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addNewComment: (state, { payload }: PayloadAction<Comment>) => {
      state.comments = [...state.comments, payload];
    },
    removeComment: (state, { payload }: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => comment.id !== payload);
    },
    setError: state => {
      state.hasError = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.comments = action.payload as Comment[];
      });
  },
});

export const { addNewComment, removeComment, setError } = commentsSlice.actions;
export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
