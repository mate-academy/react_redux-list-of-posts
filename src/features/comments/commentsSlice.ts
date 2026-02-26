import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';
import { RootState } from '../../app/store';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (data: CommentData & { postId: number }) => {
    const comment = await commentsApi.createComment(data);

    return comment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => ({
      ...state,
      loaded: false,
      hasError: false,
      items: [],
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPostComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchPostComments.fulfilled, (state, action) => ({
        ...state,
        loaded: true,
        hasError: false,
        items: action.payload,
      }))
      .addCase(fetchPostComments.rejected, state => ({
        ...state,
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
        hasError: true,
      }))
      .addCase(deleteComment.fulfilled, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      }))
      .addCase(deleteComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});

export const { clearComments } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
