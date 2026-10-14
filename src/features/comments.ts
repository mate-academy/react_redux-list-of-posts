import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type InitialStateType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: InitialStateType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/load',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addCommentToServer = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const deleteCommentFromServer = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: state => {
      return {
        ...state,
        items: [],
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      return {
        ...state,
        hasError: false,
        loaded: false,
      };
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: true,
      };
    });

    builder.addCase(loadComments.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });

    builder.addCase(addCommentToServer.pending, state => {
      return {
        ...state,
        hasError: false,
      };
    });

    builder.addCase(addCommentToServer.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    });

    builder.addCase(addCommentToServer.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });

    builder.addCase(deleteCommentFromServer.pending, state => {
      return {
        ...state,
        hasError: false,
      };
    });

    builder.addCase(deleteCommentFromServer.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.meta.arg),
      };
    });

    builder.addCase(deleteCommentFromServer.rejected, state => {
      return {
        ...state,
        hasError: true,
      };
    });
  },
});

export default commentsSlice.reducer;
