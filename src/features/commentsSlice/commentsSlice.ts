import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment as deleteCommentApi,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

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

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    const response = await deleteCommentApi(commentId);

    return response;
  },
);

type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        const nextState = state;

        nextState.loaded = false;
        nextState.hasError = false;
        nextState.items = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const nextState = state;

        nextState.loaded = true;
        nextState.items = action.payload;
      })
      .addCase(fetchComments.rejected, state => {
        const nextState = state;

        nextState.loaded = true;
        nextState.hasError = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const nextState = state;

        nextState.items.push(action.payload);
      })
      .addCase(deleteComment.pending, (state, action) => {
        const nextState = state;

        nextState.items = nextState.items.filter(
          comment => comment.id !== action.meta.arg,
        );
      });
  },
});
