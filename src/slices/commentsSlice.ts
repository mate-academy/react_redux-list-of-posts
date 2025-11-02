// src/slices/commentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { Comment } from '../types/Comment';

export type CommentsState = {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
  errorMessage?: string | null;
};

const initialState: CommentsState = {
  loaded: false,
  hasError: false,
  items: [],
  errorMessage: null,
};

function getErrorMessage(err: unknown, fallback = 'Unknown error'): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  try {
    const str = JSON.stringify(err);

    return str === '{}' ? fallback : str;
  } catch {
    return fallback;
  }
}

export const fetchCommentsByPost = createAsyncThunk<
  Comment[],
  number,
  { rejectValue: string }
>('comments/fetchByPost', async (postId, { rejectWithValue }) => {
  try {
    const data = await commentsApi.getPostComments(postId);

    return data as Comment[];
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to fetch comments'));
  }
});

export const createComment = createAsyncThunk<
  Comment,
  { postId: number; name: string; email: string; body: string },
  { rejectValue: string }
>('comments/create', async (payload, { rejectWithValue }) => {
  try {
    const data = await commentsApi.createComment({
      postId: payload.postId,
      name: payload.name,
      email: payload.email,
      body: payload.body,
    });

    return data as Comment;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to create comment'));
  }
});

export const deleteComment = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('comments/delete', async (commentId, { rejectWithValue }) => {
  try {
    await commentsApi.deleteComment(commentId);

    return commentId;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err, 'Failed to delete comment'));
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments() {
      return { ...initialState };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, () => {
        return {
          ...initialState,
          loaded: false,
          hasError: false,
          errorMessage: null,
          items: [],
        };
      })
      .addCase(
        fetchCommentsByPost.fulfilled,
        (_state, action: PayloadAction<Comment[]>) => {
          return {
            ...initialState,
            items: action.payload,
            loaded: true,
            hasError: false,
            errorMessage: null,
          };
        },
      )
      .addCase(fetchCommentsByPost.rejected, (_state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to fetch comments';

        return {
          ...initialState,
          loaded: true,
          hasError: true,
          items: [],
          errorMessage: msg,
        };
      })
      .addCase(
        createComment.fulfilled,
        (_state, action: PayloadAction<Comment>) => {
          // adiciona novo comentário imutavelmente
          return {
            ...initialState,
            items: [...(_state as CommentsState).items, action.payload],
            loaded: (_state as CommentsState).loaded,
            hasError: false,
            errorMessage: null,
          };
        },
      )
      .addCase(createComment.rejected, (state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to create comment';

        return {
          ...state,
          hasError: true,
          errorMessage: msg,
        };
      })
      .addCase(
        deleteComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          return {
            ...state,
            items: state.items.filter(c => c.id !== action.payload),
          };
        },
      )
      .addCase(deleteComment.rejected, (state, action) => {
        const msg =
          action.payload ?? action.error?.message ?? 'Failed to delete comment';

        return {
          ...state,
          hasError: true,
          errorMessage: msg,
        };
      });
  },
});

export const { clearComments } = commentsSlice.actions;

// Seletores tipados sem usar any. Se você tiver RootState, prefira importá-lo e usar aqui.
export const selectComments = (state: { comments: CommentsState }) =>
  state.comments.items;
export const selectCommentsLoaded = (state: { comments: CommentsState }) =>
  state.comments.loaded;
export const selectCommentsHasError = (state: { comments: CommentsState }) =>
  state.comments.hasError;
export const selectCommentsErrorMessage = (state: {
  comments: CommentsState;
}) => state.comments.errorMessage ?? null;

export default commentsSlice.reducer;
