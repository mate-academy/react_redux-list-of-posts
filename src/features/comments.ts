import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentsService } from '../api/comments';
import { Comment } from '../types/Comment';
import { CommentsState } from '../types/Reducer';

const initialState: CommentsState = {
  comments: [] as Comment[],
  hasError: false,
  loading: false,
  visibleForm: false,
  submitting: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => commentsService.get(postId),
);

export const deleteComment = createAsyncThunk(
  'comments/delete/fetch',
  (commentId: number) => commentsService.delete(commentId),
);

export const createComment = createAsyncThunk(
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
    setDeleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },

  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => ({
      ...state,
      loading: true,
      hasError: false,
    }));

    builder.addCase(fetchComments.fulfilled, (state, action) => ({
      ...state,
      comments: action.payload,
      loading: false,
    }));

    builder.addCase(fetchComments.rejected, state => ({
      ...state,
      hasError: true,
      loading: false,
    }));

    builder.addCase(deleteComment.pending, state => state);

    builder.addCase(createComment.pending, state => ({
      ...state,
      submitting: true,
      hasError: false,
    }));

    builder.addCase(createComment.fulfilled, (state, action) => ({
      ...state,
      comments: [...state.comments, action.payload],
      submitting: false,
    }));

    builder.addCase(createComment.rejected, state => ({
      ...state,
      hasError: true,
      submitting: false,
    }));
  },
});

export const { setVisibleForm, setDeleteComment } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
