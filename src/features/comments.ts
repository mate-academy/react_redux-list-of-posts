import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

export const loadComments = createAsyncThunk(
  'comments/fetch',
  (postId: number) => getPostComments(postId),
);

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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadComments.pending, state => {
      state.loaded = false;
      state.hasError = false;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.loaded = true;
    });
  },
});

export const { add, remove, setError } = commentsSlice.actions;
