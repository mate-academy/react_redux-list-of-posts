import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../../api/comments';

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
  'comments/fetch',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (newCommentData: Omit<Comment, 'id'>) => {
    const createdComment = await createComment(newCommentData);

    return createdComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => ({
        ...state,
        loaded: false,
        hasError: false,
      }))
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => ({
          ...state,
          items: action.payload,
          loaded: true,
        }),
      )
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
