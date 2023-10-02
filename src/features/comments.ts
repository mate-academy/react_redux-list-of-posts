import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchPostComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const sendComment = createAsyncThunk(
  'comment/add',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const discardComment = createAsyncThunk(
  'remove/comment',
  (commentId: number) => {
    return deleteComment(commentId);
  },
);

type CommentsState = {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isSubmitting?: boolean;
};

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    },
    removeComment: (state, action) => {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        return {
          ...state,
          comments: action.payload,
          isLoading: false,
        };
      })
      .addCase(fetchPostComments.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };
      })
      .addCase(sendComment.pending, (state) => {
        return {
          ...state,
          isSubmitting: true,
        };
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: [...state.comments, action.payload],
          isSubmitting: false,
        };
      })
      .addCase(discardComment.fulfilled, (state, action) => {
        return {
          ...state,
          comments: state.comments
            .filter((comment) => comment.id !== action.payload),
        };
      });
  },
});

export default commentsSlice.reducer;
export const { addComment, removeComment } = commentsSlice.actions;
