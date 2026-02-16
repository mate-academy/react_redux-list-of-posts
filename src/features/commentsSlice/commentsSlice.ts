/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../../types/Comment';
import * as commentsApi from '../../api/comments';

export interface CommentsState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async postId => {
    return commentsApi.getPostComments(postId);
  },
);

export const addComment = createAsyncThunk<
Comment,
{ postId: number; data: CommentData }
>('comments/addComment', async ({ postId, data }) => {
  return commentsApi.createComment({ ...data, postId });
});

export const deleteComment = createAsyncThunk<number, number>(
  'comments/deleteComment',
  async commentId => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => ({ ...initialState }),
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.hasError = false;
          state.loaded = true;
        },
      )
      .addCase(fetchComments.pending, state => {
        state.hasError = false;
        state.loaded = false;
      })
      .addCase(fetchComments.rejected, state => {
        state.hasError = true;
        state.loaded = false;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(addComment.rejected, state => {
        state.hasError = true;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(item => item.id !== action.payload);
        },
      )
      .addCase(deleteComment.rejected, state => {
        state.hasError = true;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
