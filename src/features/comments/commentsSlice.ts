import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

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

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  (newComment: Omit<Comment, 'id'>) => {
    return createComment(newComment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => ({
      ...state,
      items: [],
      loaded: false,
      hasError: false,
    }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(fetchComments.fulfilled, (state, action) => ({
        ...state,
        items: action.payload,
        loaded: true,
      }))
      .addCase(fetchComments.rejected, state => ({
        ...state,
        loaded: true,
        hasError: true,
      }))
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => ({
          ...state,
          items: [...state.items, action.payload],
        }),
      )
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => ({
          ...state,
          items: state.items.filter(comment => comment.id !== action.payload),
        }),
      );
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
