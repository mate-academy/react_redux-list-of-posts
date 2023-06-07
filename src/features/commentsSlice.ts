/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentServerData } from '../types/Comment';
import { getPostComments, createComment, deleteComment } from '../api/comments';

interface CommentState {
  comments: Comment[],
  loading: boolean,
  error: boolean,
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: false,
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
  async (newComment: CommentServerData) => {
    const comment = await createComment(newComment);

    return comment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(comment => (
        comment.id !== action.payload
      ));

      deleteComment(action.payload);
    },
    removeCommentsFromState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = true;
      });
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = false;
        state.error = false;
      });
    builder
      .addCase(fetchComments.rejected, (state) => {
        state.loading = true;
        state.error = true;
      });
  },
});

export default commentsSlice.reducer;
export const { removeCommentsFromState, removeComment } = commentsSlice.actions;
