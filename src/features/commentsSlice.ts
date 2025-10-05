/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createComment, deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

export type CommentState = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    return getPostComments(postId);
  },
);

export const addComments = createAsyncThunk(
  'comments/add',
  async (data: Omit<Comment, 'id'>) => {
    return createComment(data);
  },
);

export const removeComment = createAsyncThunk(
  'comments/remove',
  async (commentId: number) => {
    return deleteComment(commentId);
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComment() {
      return { ...initialState };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      return { ...state, loaded: true, items: action.payload };
    });

    builder.addCase(loadComments.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });

    builder.addCase(addComments.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(addComments.fulfilled, (state, action) => {
      return {
        ...state,
        loaded: true,
        items: [...state.items, action.payload],
      };
    });

    builder.addCase(addComments.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });

    builder.addCase(removeComment.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });

    builder.addCase(removeComment.fulfilled, (state, { meta }) => {
      return {
        ...state,
        loaded: true,
        items: state.items.filter(item => item.id !== meta.arg),
      };
    });

    builder.addCase(removeComment.rejected, state => {
      return {
        ...state,
        loaded: true,
        hasError: true,
      };
    });
  },
});

export const { clearComment } = commentsSlice.actions;
export default commentsSlice.reducer;
