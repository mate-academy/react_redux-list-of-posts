/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../../api/comments';
import { Comment, CommentData } from '../../types/Comment';

interface ApiError {
  message: string;
}

export interface CommentsState {
  items: Comment[];
  isLoading: boolean;
  error: { message: string } | null;
}

const initialState: CommentsState = {
  items: [],
  isLoading: false,
  error: null,
};

/* eslint-disable @typescript-eslint/indent */
export const fetchComments = createAsyncThunk<
  Comment[],
  number,
  { rejectValue: { message: string } }
>('comments/fetchComments', async (postId, { rejectWithValue }) => {
  try {
    const data = await commentsApi.getPostComments(postId);

    return data;
  } catch (err: unknown) {
    const error: ApiError = { message: 'Failed' };

    if (err instanceof Error) {
      error.message = err.message;
    }

    return rejectWithValue(error);
  }
});

export const addComment = createAsyncThunk<
  Comment,
  CommentData & { postId: number },
  { rejectValue: { message: string } }
>(
  'comments/addComment',
  async ({ postId, name, email, body }, { rejectWithValue }) => {
    try {
      const newComment = await commentsApi.createComment({
        postId,
        name,
        email,
        body,
      });

      return newComment;
    } catch (err: unknown) {
      const error: ApiError = { message: 'Failed' };

      if (err instanceof Error) {
        error.message = err.message;
      }

      return rejectWithValue(error);
    }
  },
);

export const deleteComment = createAsyncThunk<
  number,
  number,
  { rejectValue: { message: string } }
>('comments/deleteComment', async (commentId, { rejectWithValue }) => {
  try {
    await commentsApi.deleteComment(commentId);

    return commentId;
  } catch (err: unknown) {
    const error: ApiError = { message: 'Failed' };

    if (err instanceof Error) {
      error.message = err.message;
    }

    return rejectWithValue(error);
  }
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetchComments
      .addCase(fetchComments.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Unknown error' };
      })

      // addComment
      .addCase(addComment.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
          state.isLoading = false;
        },
      )
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Unknown error' };
      })

      // deleteComment
      .addCase(deleteComment.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(c => c.id !== action.payload);
          state.isLoading = false;
        },
      )
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Unknown error' };
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
