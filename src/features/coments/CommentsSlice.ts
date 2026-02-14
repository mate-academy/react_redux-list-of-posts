/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type StateType = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: StateType = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const deletePostComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const createPostComment = createAsyncThunk<
  Comment,
  {
    name: string;
    email: string;
    body: string;
    postId: number;
  }
>('comment/createPostComment', async ({ name, email, body, postId }) => {
  const newComment = await createComment({ name, email, body, postId });

  return newComment;
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = false;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });

    builder.addCase(deletePostComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    });

    builder.addCase(createPostComment.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
    });
  },
});

export default commentsSlice.reducer;
