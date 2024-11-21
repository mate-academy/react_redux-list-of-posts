import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: string;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (id: number) => {
    return getPostComments(id);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (commentData: Omit<Comment, 'id'>) => {
    const newComment = await createComment(commentData);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clear: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = '';
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loaded = true;
      state.items = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loaded = true;
      state.hasError = action.error.message || 'Failed to fetch comments';
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.items = state.items.filter(
        comment => comment.id !== action.payload,
      );
    });
  },
});

export default commentsSlice.reducer;
export const { clear } = commentsSlice.actions;
