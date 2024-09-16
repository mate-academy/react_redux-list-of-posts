import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentPost = {
  items: Comment[];
  loaded: boolean;
  error: boolean;
};

const initialState: CommentPost = {
  items: [],
  loaded: false,
  error: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'comments/addComment',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  (commentId: number) => {
    deleteComment(commentId);

    return commentId;
  },
);

export const commentPost = createSlice({
  name: 'commentPost',
  initialState,
  reducers: {
    setCommentPost: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, items: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        return {
          ...state,
          loaded: false,
        };
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload,
          loaded: true,
        };
      })
      .addCase(loadComments.rejected, state => {
        return {
          ...state,
          loaded: true,
          error: true,
        };
      });
    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      })
      .addCase(addNewComment.rejected, state => {
        return {
          ...state,
          error: true,
        };
      });
    builder
      .addCase(removeComment.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
        };
      })
      .addCase(removeComment.rejected, state => {
        return {
          ...state,
          error: true,
        };
      });
  },
});

export const CommentReducer = commentPost.reducer;
export const { setCommentPost } = commentPost.actions;
