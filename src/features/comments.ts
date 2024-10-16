import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
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

export const fetchComments = createAsyncThunk<Comment[], Post['id']>(
  'comments/fetch',
  async (postId, { rejectWithValue }) => {
    try {
      return await getPostComments(postId);
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Failed to fetch comments',
      );
    }
  },
);

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>(
  'comments/add',
  async (comment, { rejectWithValue }) => {
    try {
      return await createComment(comment);
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Failed to add comment',
      );
    }
  },
);

export const removeComment = createAsyncThunk<number, Comment['id']>(
  'comments/remove',
  async (commentId, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);

      return commentId;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Failed to remove comment',
      );
    }
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        comments: action.payload,
        loaded: true,
        hasError: false,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        hasError: true,
        loaded: true,
        comments: [],
      }));

    builder
      .addCase(addComment.pending, state => ({
        ...state,
        hasError: false,
      }))
      .addCase(addComment.fulfilled, (state, action) => ({
        ...state,
        comments: [...state.comments, action.payload],
        hasError: false,
      }))
      .addCase(addComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
    builder
      .addCase(removeComment.pending, state => ({
        ...state,
        hasError: false,
      }))
      .addCase(removeComment.fulfilled, (state, action) => ({
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
        hasError: false,
      }))
      .addCase(removeComment.rejected, state => ({
        ...state,
        hasError: true,
      }));
  },
});
