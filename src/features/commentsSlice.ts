import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

export type AddComment = Omit<Comment, 'id'>;

const initialState: CommentsState = {
  items: [],
  loaded: true,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/load',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  (commentData: AddComment) => {
    return createComment(commentData);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  (commentId: number) => {
    return deleteComment(commentId).then(() => commentId);
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
        loaded: false,
        hasError: false,
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
        hasError: true,
        loaded: true,
      };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    });
    builder.addCase(removeComment.fulfilled, (state, action) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.payload),
      };
    });
  },
});

export default commentsSlice.reducer;
