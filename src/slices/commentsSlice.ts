/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';

export interface CommentsState {
  loaded: boolean,
  hasError: boolean,
  items: Comment[],
}
const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    const comments = getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk<
Comment,
CommentData,
{ state: RootState }
>(
  'comments/addComment',
  async (data: CommentData, { getState }) => {
    const postId = getState().selectedPost.selectedPost?.id as number;
    const newComment = await createComment({ ...data, postId });

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.hasError = false;
        state.items = payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(removeComment.fulfilled, (state, { payload }) => {
        const newItems = state.items.filter(comment => comment.id !== payload);

        return {
          ...state,
          items: newItems,
        };
      });
  },
});

export default commentsSlice.reducer;
