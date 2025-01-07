import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';

type InitialState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    const response = await createComment(comment);

    return response;
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => ({
      ...state,
      hasError: false,
      loaded: false,
    }));

    builder.addCase(fetchComments.fulfilled, (state, { payload }) => ({
      ...state,
      comments: payload,
      loaded: true,
    }));

    builder.addCase(fetchComments.rejected, state => ({
      ...state,
      hasError: true,
      loaded: true,
    }));

    builder.addCase(addComment.fulfilled, (state, { payload }) => ({
      ...state,
      comments: [...state.comments, payload],
    }));

    builder.addCase(addComment.rejected, state => ({
      ...state,
      hasError: true,
    }));

    builder.addCase(removeComment.fulfilled, (state, { payload }) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== payload),
    }));

    builder.addCase(removeComment.rejected, state => ({
      ...state,
      hasError: true,
    }));
  },
});
