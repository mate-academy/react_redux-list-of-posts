import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const initComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const initAddComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id'>) => {
    return createComment(comment);
  },
);

export const initDeleteComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initComments.pending, state => {
      return { ...state, loaded: true };
    });

    builder.addCase(initComments.fulfilled, (state, action) => {
      return { ...state, comments: action.payload, loaded: false };
    });

    builder.addCase(initComments.rejected, state => {
      return { ...state, loaded: false, hasError: true };
    });

    builder.addCase(initAddComment.fulfilled, (state, action) => {
      return { ...state, comments: [...state.comments, action.payload] };
    });

    builder.addCase(initDeleteComment.fulfilled, (state, action) => {
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
