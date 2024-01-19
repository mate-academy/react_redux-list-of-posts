import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import * as commentsApi from '../api/comments';

type CommentState = {
  comments: Comment[],
  loading: boolean,
  error: string,
};

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('comment/fetch', (userId: number) => {
  return getPostComments(userId);
});

export const deleteCommentAsync = createAsyncThunk(
  'comment/delete', async (commentId: number) => {
    await commentsApi.deleteComment(commentId);
  },
);

export const addNewComment = createAsyncThunk(
  'comment/add', async (newComment: Comment) => {
    await commentsApi.createComment(newComment);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      return { ...state, comments: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      return { ...state, loading: true };
    });

    builder.addCase(init.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: 'No comments yet',
      };
    });

    builder.addCase(init.rejected, (state) => {
      return { ...state, loading: false, error: '' };
    });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;
