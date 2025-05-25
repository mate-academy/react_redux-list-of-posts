import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const addNewComment = createAsyncThunk(
  'newComment/fetch',
  (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'removeComment/fetch',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      return { ...state, loaded: false, hasError: false };
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });
    builder.addCase(loadComments.rejected, state => {
      return { ...state, hasError: true, loaded: true };
    });
    builder.addCase(addNewComment.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addNewComment.rejected, state => {
      return { ...state, hasError: true };
    });
    builder.addCase(removeComment.pending, (state, action) => {
      return {
        ...state,
        items: state.items.filter(comment => comment.id !== action.meta.arg),
      };
    });
  },
});

export default commentsSlice.reducer;
