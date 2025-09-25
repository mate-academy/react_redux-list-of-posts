/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

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

export const loadComments = createAsyncThunk<Comment[], number>(
  'comments/fetch',
  async (postId: number) => {
    const data = await getPostComments(postId);

    return data;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    removeComment(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadComments.pending, state => {
        state.loaded = false;
        state.hasError = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loaded = true;
        state.hasError = false;
        state.items = action.payload;
      })
      .addCase(loadComments.rejected, state => {
        state.loaded = false;
        state.hasError = true;
      });
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;
