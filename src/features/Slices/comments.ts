import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { Comment } from '../../types/Comment';

type Comments = {
  comments: Comment[];
  isLoading: boolean;
  error: string;
};

const initialState: Comments = {
  comments: [],
  isLoading: false,
  error: '',
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });

    builder.addCase(
      loadComments.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        return {
          ...state,
          comments: action.payload,
          isLoading: false,
        };
      },
    );

    builder.addCase(loadComments.rejected, state => {
      return {
        ...state,
        error: 'Error',
        isLoading: false,
      };
    });

    builder.addCase(
      addNewComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        return {
          ...state,
          comments: [...state.comments, action.payload],
        };
      },
    );

    builder.addCase(addNewComment.rejected, state => {
      return {
        ...state,
        error: 'error',
      };
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
