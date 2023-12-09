import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

  type CommentStateType = {
    items: Comment[],
    loaded: boolean,
    hasError: boolean,
  };

const commentState: CommentStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const commentInit = createAsyncThunk(
  'comments/fetch',
  (userId: number) => {
    return getPostComments(userId);
  },
);

export const createCommentInit = createAsyncThunk(
  'comments/add',
  (comment: CommentData) => {
    return createComment(comment);
  },
);

export const deleteCommentInit = createAsyncThunk(
  'comment/delete',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlicer = createSlice({
  name: 'comments',
  initialState: commentState,
  reducers: {
    deleteComments: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(commentInit.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });
    builder.addCase(commentInit.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        item: action.payload,
      };
    });
    builder.addCase(commentInit.rejected, (state) => {
      return {
        ...state,
        hasError: true,
      };
    });
    builder.addCase(createCommentInit.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    });
    builder.addCase(deleteCommentInit.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    });
  },
});

export const { deleteComments } = commentsSlicer.actions;

export default commentsSlicer.reducer;
