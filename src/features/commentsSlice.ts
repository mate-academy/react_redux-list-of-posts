/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetchPosts',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // setComments: (state, { payload }) => {
    //  state.items = [...state.items, ...payload];
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.hasError = false;
        state.loaded = true;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = false;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
// export const { setComments } = commentsSlice.actions;
