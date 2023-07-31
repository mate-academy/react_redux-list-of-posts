/* eslint no-param-reassign: "error" */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import { deleteComment, getPostComments } from '../../api/comments';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
};

export const getAsyncComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const removeAsyncComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncComments.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getAsyncComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.comments = action.payload;
      })
      .addCase(getAsyncComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(removeAsyncComment.fulfilled, (state, action) => {
        state.comments = state.comments
          .filter(({ id }) => {
            return id !== action.payload;
          });
      })
      .addCase(removeAsyncComment.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { add } = commentsSlice.actions;

export default commentsSlice.reducer;
