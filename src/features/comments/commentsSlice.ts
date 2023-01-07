/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../app/store';
import { Comment } from '../../types/Comment';
import { getPostComments } from '../../api/comments';

export interface CommentsState {
  comments: Comment [] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
};

export const getComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCommentNew: (state, action: PayloadAction<Comment>) => ({
      ...state,
      comments: [...state.comments, action.payload],
    }),
    deleteSelectedComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments
        .filter((comment: Comment) => comment.id !== action.payload),
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectComments = (state: RootState) => state.comments;

export const { addCommentNew, deleteSelectedComment } = commentsSlice.actions;

export default commentsSlice.reducer;
