import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { RootState } from '../app/store';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

export interface CommentsState {
  list: Comment[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentsState = {
  list: [],
  status: 'idle',
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

export const commentsSlice: Slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.status = 'loading';
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.status = 'idle';
          state.list = action.payload;
        },
      )
      .addCase(fetchComments.rejected, state => {
        state.status = 'failed';
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.list.push(action.payload);
        },
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter(c => c.id !== action.payload);
        },
      );
  },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState): Comment[] =>
  state.comments.list;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
