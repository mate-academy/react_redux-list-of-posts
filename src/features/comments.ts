import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentsService } from '../api/comments';
import { Comment } from '../types/Comment';
import { CommentsState } from '../types/Reducer';

const initialState: CommentsState = {
  comments: [] as Comment[],
  hasError: false,
  loaded: true,
  visibleForm: false,
  submitting: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsService.get(postId),
);

export const initCommentDeleted = createAsyncThunk(
  'comments/delete/fetch',
  (commentId: number) => commentsService.delete(commentId),
);

export const initCommentCreat = createAsyncThunk(
  'comments/create/fetch',
  ({ name, email, body, postId }: Comment) =>
    commentsService.create({
      name,
      email,
      body,
      postId,
    }),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setVisibleForm: (state, action: PayloadAction<boolean>) => ({
      ...state,
      visibleForm: action.payload,
    }),
    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },

  extraReducers: builder => {
    builder.addCase(initComments.pending, state => ({
      ...state,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(initComments.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loaded: false,
    }));

    builder.addCase(initComments.rejected, state => ({
      ...state,
      hasError: true,
      loaded: false,
    }));

    builder.addCase(initCommentDeleted.pending, state => state);

    builder.addCase(initCommentCreat.pending, state => ({
      ...state,
      submitting: true,
      hasError: false,
    }));

    builder.addCase(initCommentCreat.fulfilled, (state, action) => ({
      ...state,
      comments: [...state.comments, action.payload],
      submitting: false,
    }));

    builder.addCase(initCommentCreat.rejected, state => ({
      ...state,
      hasError: true,
      submitting: false,
    }));
  },
});

export const { setVisibleForm, deleteComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
