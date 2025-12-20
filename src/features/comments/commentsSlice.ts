import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment } from '../../types/Comment';

export const fetchComments = createAsyncThunk(
  'comments/fetchComment',
  async (postId: number) => {
    const comments = await commentsApi.getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: {
    name: string;
    email: string;
    body: string;
    postId: number;
  }) => {
    const newComment = await commentsApi.createComment({
      name: data.name,
      email: data.email,
      body: data.body,
      postId: data.postId,
    });

    return newComment;
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      await commentsApi.deleteComment(commentId);

      return commentId;
    } catch {
      return rejectWithValue(commentId);
    }
  },
);

export interface CommentState {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearComments: state => {
      // eslint-disable-next-line no-param-reassign
      state.items = [];
      // eslint-disable-next-line no-param-reassign
      state.loaded = false;
      // eslint-disable-next-line no-param-reassign
      state.hasError = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.loaded = false;
        // eslint-disable-next-line no-param-reassign
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          // eslint-disable-next-line no-param-reassign
          state.items = action.payload;
          // eslint-disable-next-line no-param-reassign
          state.loaded = true;
        },
      )
      .addCase(fetchComments.rejected, state => {
        // eslint-disable-next-line no-param-reassign
        state.hasError = true;
        // eslint-disable-next-line no-param-reassign
        state.loaded = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          // eslint-disable-next-line no-param-reassign
          state.items.push(action.payload);
        },
      )
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          // eslint-disable-next-line no-param-reassign
          state.items = state.items.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export const { clearComments } = commentSlice.actions;

export default commentSlice.reducer;
