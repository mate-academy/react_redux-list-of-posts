import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(removeComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      });
  },
});

export default commentsSlice.reducer;
