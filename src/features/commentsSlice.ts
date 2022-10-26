/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type CommentsState = {
  comments: Comment[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loaded: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'comments/fetch', (data: number | undefined) => {
    return getPostComments(data);
  },
);

const postsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    add: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
      state.loaded = true;
    },
    take: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.hasError = false;
      state.comments = action.payload;
      state.loaded = true;
    });
    builder.addCase(init.rejected, (state) => {
      state.loaded = true;
      state.hasError = true;
    });
  },
});

export const { set, add, take } = postsSlice.actions;
export default postsSlice.reducer;
