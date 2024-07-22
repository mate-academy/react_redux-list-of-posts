import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const createNewComment = createAsyncThunk(
  'comments/addComment',
  async (commentToCreate: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(commentToCreate);

    return createdComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        return {
          ...state,
          loaded: false,
          hasError: false,
        };
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        return {
          ...state,
          loaded: true,
          items: action.payload,
        };
      })
      .addCase(loadComments.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      })
      .addCase(createNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createNewComment.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      })
      .addCase(removeComment.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export default commentsSlice.reducer;
