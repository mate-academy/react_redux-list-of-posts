/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Comment } from '../types/Comment';

export interface CommentState {
  items: Comment[];
  loading: boolean;
  hasError: boolean;
}

const initialState: CommentState = {
  items: [],
  loading: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const commentsFromServer = await getPostComments(postId);

    return commentsFromServer;
  },
);

export const addCommentAsync = createAsyncThunk(
  'comments/addCommentAsync',
  async (comment: Omit<Comment, 'id'>) => {
    const newComment = await createComment(comment);

    return newComment;
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteCommentAsync',
  async (commentId: number) => {
    await deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.items = action.payload;
    },
    deleteCommentState: (state, action: PayloadAction<number>) => {
      state.items = [...state.items].filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.hasError = false;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.items = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchComments.rejected, (state) => {
        state.hasError = true;
        state.loading = false;
      })
      .addCase(
        addCommentAsync.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.items.push(action.payload);
        },
      )
      .addCase(addCommentAsync.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export const { setComments, deleteCommentState } = commentsSlice.actions;

export const selectCommentsState = (state: RootState) => state.comments;

export default commentsSlice.reducer;
