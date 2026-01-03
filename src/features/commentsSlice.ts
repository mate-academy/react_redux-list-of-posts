import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const deleteItem = createAsyncThunk(
  'comment/delete',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addItem = createAsyncThunk(
  'comment/create',
  async (payload: { postId: number; data: CommentData }) => {
    const newComment = await createComment({
      ...payload.data,
      postId: payload.postId,
    });

    return newComment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    });

    builder.addCase(init.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
    });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = state.items.filter(item => item.id !== action.payload);
    });

    builder.addCase(deleteItem.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });

    builder.addCase(addItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(addItem.rejected, state => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = true;
    });
  },
});

export default commentsSlice.reducer;

export const {} = commentsSlice.actions;
