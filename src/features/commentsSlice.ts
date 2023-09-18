/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsSliceState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  loaded: boolean,
  hasError: boolean,
}

const initialState: CommentsSliceState = {
  comments: [],
  status: 'idle',
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const comment = await createComment(data);

    return comment;
  },
);

export const removeComment = createAsyncThunk(
  'comment/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fastRemoval: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
        state.loaded = true;
        state.hasError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = 'failed';
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(comment => comment.id !== action.payload);
      });
  },
});

export const { fastRemoval } = commentSlice.actions;

export default commentSlice.reducer;
