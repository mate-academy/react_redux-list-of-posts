/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';
import * as commentApi from '../../api/comments';

export interface CommentsState {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
}

export const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comment = await getPostComments(postId);

    return comment;
  },
);

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComments: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
      commentApi.deleteComment(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPostId.pending, state => {
        state.loaded = false;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loaded = true;
      })
      .addCase(fetchCommentsByPostId.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { addComments, deleteComments } = commentSlice.actions;
export default commentSlice.reducer;
