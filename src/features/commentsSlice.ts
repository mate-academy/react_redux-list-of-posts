/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';
import { Post } from '../types/Post';

type CommentsState = {
  items: Comment[];
  loaded: boolean;
  hasError: string;
};

export const initialState: CommentsState = {
  items: [],
  loaded: false,
  hasError: '',
};

export const setComments = createAsyncThunk(
  'state/comments',
  async (post: Post) => {
    const comments = await getPostComments(post.id);

    return comments;
  },
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(setComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
      state.hasError = '';
    });
    builder.addCase(setComments.pending, state => {
      state.loaded = false;
    });
    builder.addCase(setComments.rejected, state => {
      state.loaded = true;
      state.hasError = 'Something went wrong';
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { addItem, removeItem } = commentsSlice.actions;
