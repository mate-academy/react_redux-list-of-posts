import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPostComments,
  createComment,
  deleteComment as apiDeleteComment,
} from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await apiDeleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [] as Comment[],
    loaded: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        return { ...state, loaded: false, hasError: false };
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        return { ...state, loaded: true, items: action.payload };
      })
      .addCase(fetchComments.rejected, state => {
        return { ...state, loaded: true, hasError: true };
      })
      .addCase(addComment.fulfilled, (state, action) => {
        return { ...state, items: [...state.items, action.payload] };
      })
      .addCase(addComment.rejected, state => {
        return { ...state, hasError: true };
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        };
      });
  },
});

export default commentsSlice.reducer;
