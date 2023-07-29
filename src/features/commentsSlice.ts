import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, NewCommentData } from '../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
  error: string;
};

const initialState: CommentsState = {
  comments: [],
  loaded: true,
  hasError: false,
  visible: false,
  error: '',
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'commentCreate/fetch',
  (newComment: NewCommentData) => {
    return createComment(newComment);
  },
);

export const deleteCom = createAsyncThunk(
  'deleteComment/fetch',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    delComment: (state, action) => {
      const filterComment = state.comments.filter(
        comment => comment.id !== action.payload,
      );

      return {
        ...state,
        comments: filterComment,
      };
    },
    setError: (state, action) => {
      return {
        ...state,
        hasError: action.payload,
      };
    },
    setVisible: (state, action) => {
      return {
        ...state,
        visible: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loaded: false,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        loaded: true,
      };
    });
    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        loaded: true,
        hasError: true,
        error: 'Something went wrong',
      };
    });
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
