import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  getPostComments,
} from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
};

type NewCommentPayload = {
  postId: number;
  data: CommentData;
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const createComment = createAsyncThunk(
  'comments/create',
  async ({ postId, data }: NewCommentPayload) => {
    return createCommentApi({ ...data, postId });
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteCommentApi(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, () => ({
        loaded: false,
        hasError: false,
        items: [],
      }))
      .addCase(loadComments.fulfilled, (_state, action) => ({
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(loadComments.rejected, () => ({
        loaded: true,
        hasError: true,
        items: [],
      }))
      .addCase(createComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      .addCase(createComment.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
        items: state.items,
      }))
      .addCase(deleteComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }))
      .addCase(deleteComment.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
        items: state.items,
      }));
  },
});

export default commentsSlice.reducer;
