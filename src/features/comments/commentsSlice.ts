/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

const initialState = {
  items: [] as Comment[],
  loaded: false as boolean,
  error: false as boolean,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

// eslint-disable-next-line @typescript-eslint/indent
export const addComment = createAsyncThunk<
  Comment,
  { postId: number; data: CommentData }
>('comments/addComment', async ({ postId, data }) => {
  return createComment({ postId, ...data });
});

export const removeComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async commentId => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.error = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.error = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id != action.payload);
      });
  },
});

export default commentsSlice.reducer;
