import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/postComments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  (postId: number) => getPostComments(postId),
);

type NewCommentParams = CommentData & { postId: number };

export const addComment = createAsyncThunk(
  'comments/add',
  (params: NewCommentParams) => createComment(params),
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        items: [],
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        items: [...state.items, action.payload],
      }))
      // optimistic removal: remove the comment immediately when deletion starts
      .addCase(removeComment.pending, (state, action) => ({
        ...state,
        items: state.items.filter(comment => comment.id !== action.meta.arg),
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }))
      .addCase(removeComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});

export default commentsSlice.reducer;
