import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';

type CommentState = {
  comments: Comment[],
  isLoading: boolean,
  hasError: boolean,
};

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'comments/fetch', (value: number) => {
    return getPostComments(value);
  },
);

export const remove = createAsyncThunk(
  'comments/remove', async (value: number) => {
    await commentsApi.deleteComment(value);

    return value;
  },
);

export const add = createAsyncThunk(
  'comments/add', (newComment: Omit<Comment, 'id'>) => {
    return commentsApi.createComment(newComment);
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      if (action.payload) {
        state.comments = action.payload;
      }

      state.isLoading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      const newComments = state.comments
        .filter(comment => comment.id !== action.payload);

      state.comments = newComments;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.isLoading = false;
    });
  },
});

export default commentsSlice.reducer;
