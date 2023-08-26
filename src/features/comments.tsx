/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comments';

type CommentsState = {
  comments: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: number) => {
    const comments = await getPostComments(postId);

    return comments;
  },
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: Omit<Comment, 'id'>) => {
    const newComment = await createComment(data);

    return newComment;
  },
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId: number) => {
    const removedComment = await deleteComment(commentId);

    return removedComment;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },

    clearComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
      state.loaded = true;
    });

    builder.addCase(addComment.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });

    builder.addCase(removeComment.fulfilled, (state, action) => {
      state.comments = state.comments
        .filter(comment => comment.id !== action.payload);
    });
  },
});

export const { setComments, clearComment } = commentsSlice.actions;

export default commentsSlice.reducer;
