import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments } from '../api/comments';
import { deleteComment as deleteCommentApi } from '../api/comments';

const initialState = {
  loaded: false,
  items: [] as Comment[],
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    return deleteCommentApi(commentId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

const commentsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setComments(state, { payload }: PayloadAction<Comment[]>) {
      state.items = payload;
    },
    removeCommentLocally(state, { payload }: PayloadAction<number>) {
      state.items = state.items.filter(comment => comment.id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.hasError = false;
      state.loaded = false;
      state.items = [];
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const commentId = action.meta.arg;

      state.items = state.items.filter(comment => comment.id !== commentId);
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  },
});

export default commentsSlice.reducer;
export const CommentsActions = {
  ...commentsSlice.actions,
  loadComments,
  deleteComment,
  addComment,
};
