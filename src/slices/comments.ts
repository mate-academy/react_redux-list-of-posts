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
      // eslint-disable-next-line no-param-reassign
      state.items = payload;
    },
    removeCommentLocally(state, { payload }: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(comment => comment.id !== payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.items = [];
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const commentId = action.meta.arg;

      // eslint-disable-next-line no-param-reassign
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
