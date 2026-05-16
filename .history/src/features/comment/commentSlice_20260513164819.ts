import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  getPostComments,
  deleteComment,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

interface CommentState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (commentData: Comment) => {
    return createComment(commentData);
  },
);

export const deleteComments = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });

    builder.addCase(fetchComments.rejected, state => {
      state.loaded = false;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteComments.pending, (state, action) => {
      const commentID = action.meta.arg;

      state.items.filter(item => item.id === action.payload);
    });
  },
});

export default commentSlice.reducer;
