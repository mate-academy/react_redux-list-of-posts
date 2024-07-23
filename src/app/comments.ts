/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

type CommentsType = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsType = {
  items: [],
  loaded: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/init',
  (postId: number) => {
    return getPostComments(postId);
  },
);

export const { reducer, actions } = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Comment>) => {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(it => it.id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.loaded = true;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = false;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = false;
    });
  },
});
