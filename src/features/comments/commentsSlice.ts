/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

export const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const deleteSomeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[] | []>) {
      state.items = action.payload;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(loadComments.rejected, state => {
        state.hasError = true;
        state.loaded = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteSomeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          comment => comment.id !== action.payload,
        );
      });
  },
});

export default commentsSlice.reducer;
export const { setComments, setLoaded, setError } = commentsSlice.actions;
