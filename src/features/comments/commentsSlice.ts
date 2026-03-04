/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

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

// load comments for a post
export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchAll',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

// add a new comment and return it
export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async commentData => {
    const comment = await createComment(commentData);

    return comment;
  },
);

// remove a comment by id, return the id so reducer can drop it
export const removeComment = createAsyncThunk<number, number>(
  'comments/remove',
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
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
        },
      );
  },
});

export const selectComments = (state: { comments: CommentsState }) =>
  state.comments.items;
export const selectCommentsLoaded = (state: { comments: CommentsState }) =>
  state.comments.loaded;
export const selectCommentsHasError = (state: { comments: CommentsState }) =>
  state.comments.hasError;

export default commentsSlice.reducer;
