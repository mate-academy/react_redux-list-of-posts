import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const commentsAsync = createAsyncThunk(
  'comments/fetch', async (postId: number) => {
    const commentsFromServer = await commentsApi.getPostComments(postId);

    return commentsFromServer;
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/create', async ({
    name,
    email,
    body,
    id: postId,
  }: CommentData & Pick<Post, 'id'>) => {
    const newComment = await commentsApi.createComment({
      name,
      email,
      body,
      postId,
    });

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/delete', (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => ({
      ...state,
      comments: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentsAsync.pending, (state) => ({
        ...state,
        loaded: true,
      }))
      .addCase(commentsAsync.fulfilled, (
        state,
        action: PayloadAction<Comment[]>,
      ) => ({
        ...state,
        comments: action.payload,
        loaded: false,
      }))
      .addCase(commentsAsync.rejected, (state) => ({
        ...state,
        loaded: false,
        hasError: true,
      }))
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(createCommentAsync.rejected, (state) => ({
        ...state,
        hasError: true,
      }))
      .addCase(deleteCommentAsync.rejected, (state) => ({
        ...state,
        hasError: true,
      }));
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
