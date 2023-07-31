import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment, NewCommentData } from '../types/Comment';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../api/comments';

type CommentsState = {
  comments: Comment[];
  commentId: number | null;
  loaded: boolean;
  hasError: boolean;
  visible: boolean;
  errorMessage: string;
  submitting: boolean;
  submittingError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  commentId: null,
  loaded: false,
  hasError: false,
  visible: false,
  errorMessage: '',
  submitting: false,
  submittingError: false,
};

export const init = createAsyncThunk('comments/fetch', (postId: number) => {
  return getPostComments(postId);
});

export const addComment = createAsyncThunk(
  'comments/commentCreate',
  (newComment: NewCommentData) => {
    return createComment(newComment);
  },
);

export const removeComment = createAsyncThunk(
  'comments/deleteComment',
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
    setCommentId: (state, action) => {
      return {
        ...state,
        commentId: action.payload,
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
    setSubmitting: (state, action) => {
      return {
        ...state,
        submitting: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return {
        ...state,
        loaded: true,
      };
    });
    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: false,
        comments: action.payload,
      };
    });
    builder.addCase(init.rejected, (state) => {
      return {
        ...state,
        loaded: false,
        hasError: true,
        error: 'Something went wrong',
      };
    });
    builder.addCase(addComment.pending, state => {
      return {
        ...state,
        submitting: true,
      };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        submitting: false,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(addComment.rejected, state => {
      return {
        ...state,
        submitting: false,
        submittingError: true,
        errorMessage: 'Something went wrong',
      };
    });
    builder.addCase(removeComment.fulfilled, (state) => {
      return {
        ...state,
        comments: state.comments.filter(comment => {
          return comment.id !== state.commentId;
        }),
      };
    });
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;
