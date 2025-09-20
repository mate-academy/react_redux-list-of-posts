import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { RootState } from '../app/store';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, ...data }: CommentData & { postId: number }) => {
    return commentsApi.createComment({ ...data, postId });
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loaded = true;
          state.items = action.payload;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
        },
      );
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState): Comment[] =>
  state.comments.items;
export const selectCommentsStatus = createSelector(
  (state: RootState) => state.comments.loaded,
  (state: RootState) => state.comments.hasError,
  (loaded, hasError) => ({ loaded, hasError }),
);
