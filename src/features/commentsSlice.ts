import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments, deleteComment, createComment } from '../api/comments';

type InitialState = {
  value: Comment[];
  isLoading: boolean;
  onSubmitting: boolean;
  onDeleting: boolean;
  errorText: boolean;
};

const initialState: InitialState = {
  value: [],
  isLoading: false,
  onSubmitting: false,
  onDeleting: false,
  errorText: false,
};

export const fetchComments = createAsyncThunk(
  'fetch/comments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const removeComment = createAsyncThunk(
  'fetch/deleteComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const addComment = createAsyncThunk(
  'fetch/addComment',
  (data: Comment) => {
    return createComment(data);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // DOWNLOAD COMMENTS...

    builder.addCase(fetchComments.pending, state => {
      return { ...state, isLoading: true, errorText: false };
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        return {
          ...state,
          value: action.payload,
          isLoading: false,
        };
      },
    );
    builder.addCase(fetchComments.rejected, state => {
      return { ...state, errorText: true, isLoading: false };
    });

    // REMOVE COMMENT ...

    builder.addCase(removeComment.pending, state => {
      return { ...state, onDeleting: true, errorText: false };
    });
    builder.addCase(
      removeComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          value: state.value.filter(comment => comment.id !== action.payload),
          onDeleting: false,
        };
      },
    );
    builder.addCase(removeComment.rejected, state => {
      return { ...state, errorText: true };
    });

    // CREATE COMMENT...

    builder.addCase(addComment.pending, state => {
      return { ...state, onSubmitting: true, errorText: false };
    });
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        return {
          ...state,
          value: [...state.value, action.payload],
          onSubmitting: false,
        };
      },
    );
    builder.addCase(addComment.rejected, state => {
      return { ...state, errorText: true, isLoading: false };
    });
  },
});

export default commentsSlice.reducer;
