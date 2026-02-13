/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import * as commentsApi from '../api/comments';
import { RootState } from '../app/store';

const initialState: { items: Comment[]; hasError: string; loaded: boolean } = {
  items: [],
  hasError: '',
  loaded: true,
};

export const loadPostComments = createAsyncThunk(
  `comments/fetch`,
  async (commentId: number) => {
    return commentsApi.getPostComments(commentId) as Promise<Comment[]>;
  },
);

export const addPostComment = createAsyncThunk(
  `comments/add`,
  async (newComment: Omit<Comment, 'id' | 'postId'>, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedPostId = state.selectedPost.post?.id;

    if (!selectedPostId) {
      throw new Error('Something went wrong');
    }

    return commentsApi.createComment({
      ...newComment,
      postId: selectedPostId,
    }) as Promise<Comment>;
  },
);

export const deletePostComment = createAsyncThunk(
  `comments/delete`,
  async (commentId: number) => {
    await commentsApi.deleteComment(commentId);

    return commentId;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(loadPostComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(loadPostComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
    builder.addCase(loadPostComments.rejected, state => {
      state.hasError = 'Something went wrong!';
      state.loaded = true;
    });

    builder.addCase(addPostComment.pending, state => {
      state.loaded = false;
    });
    builder.addCase(
      addPostComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.items = [...state.items, action.payload];
        state.loaded = true;
      },
    );
    builder.addCase(addPostComment.rejected, state => {
      state.hasError = 'Something went wrong!';
      state.loaded = true;
    });

    builder.addCase(deletePostComment.pending, state => {
      state.loaded = false;
    });
    builder.addCase(
      deletePostComment.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loaded = true;
      },
    );
    builder.addCase(deletePostComment.rejected, state => {
      state.hasError = 'Something went wrong!';
      state.loaded = true;
    });
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
