import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import * as commentsApi from '../api/comments';

type CommentsState = {
  comments: Comment[],
  isLoading: boolean,
  isError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  isError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments', (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add', (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete', (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter(comment => comment.id !== action.payload),
      };
    },
    clearComments: (state) => {
      return {
        ...state,
        comments: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        isLoading: true,
        isError: false,
      };
    });
    builder.addCase(fetchComments.rejected, (state) => {
      return {
        ...state,
        isLoading: true,
        isError: true,
      };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(addComment.rejected, (state) => {
      return {
        ...state,
        isError: true,
      };
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      return {
        ...state,
        isError: false,
      };
    });
  },
});

export const { removeComment, clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
