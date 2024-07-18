import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentsApi from '../api/comments';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const fetchComments = createAsyncThunk(
  'comments/fetch',
  async (userId: number) => {
    return getPostComments(userId);
  },
);

export const addComment = createAsyncThunk(
  'comments/add',
  async (comment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(comment);
  },
);

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (commentId: number) => {
    return commentsApi.deleteComment(commentId);
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
    builder.addCase(fetchComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { setComments } = commentSlice.actions;
