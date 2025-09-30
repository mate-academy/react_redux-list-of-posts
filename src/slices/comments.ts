import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, getPostComments } from '../api/comments';
import { deleteComment as deleteCommentApi } from '../api/comments';

const initialState = {
  loaded: false,
  items: [] as Comment[],
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/feth',
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
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, { payload }: PayloadAction<Comment[]>) {
      const currentState = state;

      currentState.items = payload;
    },
    removeComment(state, { payload }: PayloadAction<number>) {
      const currentState = state;

      currentState.items = state.items.filter(item => item.id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      const currentState = state;

      currentState.hasError = false;
      currentState.items = [];
      currentState.loaded = false;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const commentId = action.meta.arg;
      const currentState = state;

      currentState.items = state.items.filter(item => item.id !== commentId);
    });

    builder.addCase(loadComments.rejected, state => {
      const currentState = state;

      currentState.hasError = true;
      currentState.loaded = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const currentState = state;

      currentState.items.push(action.payload);
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
