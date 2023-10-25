/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { Post } from '../types/Post';

type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};

const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    deleteLocalComment: (state, action) => {
      state.items = state.items.filter(comment => {
        return comment.id !== action.payload.id;
      });
    },
    addLocalComment: (state, action) => {
      state.items = [...state.items, action.payload];
    },
  },
  extraReducers(builder) {
    builder.addCase(deleteComment.rejected, (state, action) => {
      const rejectedComment = action.payload as Comment;

      if (rejectedComment) {
        state.items = [...state.items, rejectedComment];
      }
    });

    builder.addCase(loadComments.pending, (state) => {
      state.loaded = false;
      state.hasError = false;
    });
    builder.addCase(loadComments.rejected, (state) => {
      state.hasError = true;
      state.loaded = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = false;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.items = [...state.items, action.payload];
    });
    builder.addCase(addComment.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const deleteComment = createAsyncThunk(
  'comments/delete',
  async (comment: Comment, { rejectWithValue }) => {
    try {
      await commentsApi.deleteComment(comment.id);

      return comment;
    } catch (error) {
      return rejectWithValue(comment);
    }
  },
);

export const loadComments = createAsyncThunk(
  'comments/load', (post: Post) => {
    return commentsApi.getPostComments(post.id);
  },
);

export const addComment = createAsyncThunk(
  'comments/add', (data: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(data);
  },
);

export default commentsSlice.reducer;
export const { deleteLocalComment, addLocalComment } = commentsSlice.actions;
