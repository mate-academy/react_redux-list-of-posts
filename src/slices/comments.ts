/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';
import { RootState } from '../app/store';

export interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => {
        return comment.id !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.status = 'idle';
      state.comments = action.payload;
    });
  },
});

export const commentsSelector = (state: RootState) => state.comments.comments;
export const commentsStatusSelector = (state: RootState) => {
  return state.comments.status;
};

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
